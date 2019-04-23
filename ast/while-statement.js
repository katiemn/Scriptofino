const BooleanLiteral = require('./boolean-literal');
const Type = require('./type');

module.exports = class WhileStatement {
  constructor(test, body) {
    Object.assign(this, { test, body });
  }
  analyze(context) {
    this.test.analyze(context);
    this.test.type.mustBeCompatibleWith(Type.BOOLEAN);
    //this.body.analyze(context.createChildContextForLoop());
    const bodyContext = context.createChildContextForLoop();
    this.body.forEach(s => s.analyze(bodyContext));
  }
};