/*
 * Translation to JavaScript
 *
 * credit to: https://github.com/rtoal/plainscript/blob/master/backend/javascript-generator.js
 *
 * Requiring this module adds a gen() method to each of the AST classes.
 * Nothing is actually exported from this module.
 *
 * Each gen() method returns a fragment of JavaScript. The gen() method on
 * the program class pretty-prints the complete JavaScript code.
 *
 *   require('./backend/javascript-generator');
 *   program.gen();
 */

const prettyJs = require('pretty-js');

const Context = require('../semantics/context');
const Argument = require('../ast/argument');
const AssignmentStatement = require('../ast/assignment-statement');
const BinaryExpression = require('../ast/binary-expression');
const BooleanLiteral = require('../ast/boolean-literal');
const BreakStatement = require('../ast/break-statement');
const Call = require('../ast/call-statement');
const DictionaryExpression = require('../ast/dictionary-expression');
const Error = require('../ast/error');
const ForStatement = require('../ast/for-statement');
const FunctionDeclaration = require('../ast/function-declaration');
const FunctionObject = require('../ast/function-object');
const IdentifierExpression = require('../ast/identifier-expression');
const IfStatement = require('../ast/if-statement');
const ListExpression = require('../ast/list-expression');
const NoneLiteral = require('../ast/none-literal');
const NumericLiteral = require('../ast/numeric-literal');
const ObjectLiteral = require('../ast/object');
const Parameter = require('../ast/parameter');
const Program = require('../ast/program');
const ReturnStatement = require('../ast/return-statement');
const StringLiteral = require('../ast/string-literal');
const SubscriptedExpression = require('../ast/subscripted-expression');
const TupleExpression = require('../ast/tuple-expression');
const UnaryExpression = require('../ast/unary-expression');
const VariableDeclaration = require('../ast/variable-declaration');
const Variable = require('../ast/variable');
const WhileStatement = require('../ast/while-statement');

function makeOp(op) {
  return {
    not: '!', yy: '&&', oo: '||', es: '===', 'no es': '!==',
  }[op] || op;
}

// jsName(e) takes any PlainScript object with an id property, such as a
// Variable, Parameter, or FunctionDeclaration, and produces a JavaScript
// name by appending a unique identifying suffix, such as '_1' or '_503'.
// It uses a cache so it can return the same exact string each time it is
// called with a particular entity.
const jsName = (() => {
  let lastId = 0;
  const map = new Map();
  return (v) => {
    if (!(map.has(v))) {
      map.set(v, ++lastId); // eslint-disable-line no-plusplus
    }
    return `${v.id}_${map.get(v)}`;
  };
})();

// This is a nice helper for variable declarations and assignment statements.
// The AST represents both of these with lists of sources and lists of targets,
// but when writing out JavaScript it seems silly to write `[x] = [y]` when
// `x = y` suffices.
function bracketIfNecessary(a) {
  return (a.length === 1) ? `${a}` : `[${a.join(',')}]`;
}

function generateLibraryFunctions() {
  function generateLibraryStub(name, params, body) {
    const entity = Context.INITIAL.declarations[name];
    return `function ${jsName(entity)}(${params}) {${body}}`;
  }
  return [
    generateLibraryStub('imprimir', '_', 'console.log(_);'),
    generateLibraryStub('piso', '_', 'return Math.floor(_);'),
    // generateLibraryStub('sqrt', '_', 'return Math.sqrt(_);'),
  ].join('');
}

function generateBlock(block) {
  return block.map(s => `${s.gen()};`).join('');
}

Object.assign(Argument.prototype, {
  gen() { return this.expression.gen(); },
});

Object.assign(AssignmentStatement.prototype, {
  gen() {
    const targets = this.targets.map(t => t.gen());
    const sources = this.sources.map(s => s.gen());
    return `${bracketIfNecessary(targets)} = ${bracketIfNecessary(sources)}`;
  },
});

Object.assign(BinaryExpression.prototype, {
  gen() { return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`; },
});

Object.assign(BooleanLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(BreakStatement.prototype, {
  gen() { return 'break'; },
});

Object.assign(Call.prototype, {
  gen() {
    const fun = this.callee.referent;
    const { args } = this;
    return `${jsName(fun)}(${args.map(a => (a ? a.gen() : 'undefined')).join(',')})`;
  },
});

Object.assign(DictionaryExpression.prototype, {
  gen() {
    const keyVal = this.members.map(v => `${v.key.gen()}: ${v.value.gen()}`);
    const createList = (x, y, i) => ((i === 0) ? `${y}` : `${x}, ${y}`);
    return `{${keyVal.reduce(createList, '')}}`;
  },
});

Object.assign(Error.prototype, {
  gen() { return `throw new Error (${this.value})`; },
});

Object.assign(ForStatement.prototype, {
  gen() {
    const statements = this.body.statements.map(s => s.gen()).join('');
    if (this.expression.type.name === 'tuple') {
      return `${this.expression.gen()}.forEach((${jsName(this.id)}) => {${statements}});`;
    // eslint-disable-next-line no-else-return
    } else if (this.expression.type.name === 'diccionario') {
      return `for (const ${jsName(this.id)} in ${this.expression.gen()}) {${statements}}`;
    }
    return '';
  },
});

Object.assign(FunctionDeclaration.prototype, {
  gen() {
    return this.function.gen();
  },
});

Object.assign(FunctionObject.prototype, {
  gen() {
    return `function ${jsName(this)}(${this.params.map(p => p.gen()).join(',')}) {
      ${generateBlock(this.suite)};
    }`;
  },
});

Object.assign(IdentifierExpression.prototype, {
  gen() { return this.referent.gen(); },
});

Object.assign(IfStatement.prototype, {
  gen() {
    const cases = this.tests.map((test, index) => {
      const prefix = index === 0 ? 'if' : '} else if';
      return `${prefix} (${test.gen()}) {${generateBlock(this.consequents[index])}`;
    });
    const alternate = this.alternate ? `}else{${generateBlock(this.alternate)}` : '';
    return `${cases.join('')}${alternate}}`;
  },
});

Object.assign(ListExpression.prototype, {
  gen() {
    const jsMembers = this.members.map(member => member.gen());
    return `[${jsMembers.join(',')}]`;
  },
});

Object.assign(NoneLiteral.prototype, {
  gen() { return 'undefined'; },
});

Object.assign(NumericLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(ObjectLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(Parameter.prototype, {
  gen() {
    let translation = jsName(this);
    if (this.defaultExpression) {
      translation += ` = ${this.defaultExpression.gen()}`;
    }
    return translation;
  },
});

Object.assign(Program.prototype, {
  gen() {
    const libraryFunctions = generateLibraryFunctions();
    const programStatements = this.statements.map(s => `${s.gen()};`).join('');
    const target = `${libraryFunctions}${programStatements}`;
    return prettyJs(target, { indent: '  ' });
  },
});

Object.assign(ReturnStatement.prototype, {
  gen() {
    return `return ${this.returnValue ? this.returnValue.gen() : ''}`;
  },
});

Object.assign(StringLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(SubscriptedExpression.prototype, {
  gen() {
    const base = this.variable.gen();
    const subscript = this.subscript.gen();
    return `${base}[${subscript}]`;
  },
});

Object.assign(TupleExpression.prototype, {
  gen() {
    const members = this.members.map(m => m.gen());
    const createList = (x, y, i) => ((i === 0) ? `${y}` : `${x}, ${y}`);
    return `[${members.reduce(createList, '')}]`;
  },
});

Object.assign(UnaryExpression.prototype, {
  gen() { return `(${makeOp(this.op)} ${this.operand.gen()})`; },
});

Object.assign(VariableDeclaration.prototype, {
  gen() {
    const variables = this.variables.gen();
    const initializers = this.initializers.gen();
    return `let ${variables} = ${initializers}`;
  },
});

Object.assign(Variable.prototype, {
  gen() { return jsName(this); },
});

Object.assign(WhileStatement.prototype, {
  gen() {
    return `while (${this.test.gen()}) { ${generateBlock(this.body)} }`;
  },
});
