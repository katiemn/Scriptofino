const Variable = require('../ast/variable');
const Type = require('./type');

module.exports = class FunctionObject {
  constructor(annotation, id, params, suite) {
    Object.assign(this, {
      annotation, id, params, suite,
    });
  }

  // for pre-defined functions
  get isExternal() {
    return !this.function.suite;
  }

  analyze(context) {
    const { paramTypes } = this.annotation;

    if (JSON.stringify(paramTypes) === JSON.stringify(['nada']) && this.params.length > 0) {
      throw new Error('Function should not have params');
    }
    if (JSON.stringify(paramTypes) !== JSON.stringify(['nada']) && this.params.length !== paramTypes.length) {
      throw new Error('Number of parameters do not match');
    }
    const childContext = context.createChildContextForFunctionBody(this);
    this.params.forEach((param, index) => {
      const variable = new Variable(param.id,
        Type.forName(this.annotation.paramTypes[index]), false);
      this.params[index] = variable;
      context.add(variable);
    });

    if (this.suite) {
      this.suite.forEach(s => s.analyze(childContext));
    }
  }
};
