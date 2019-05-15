const Type = require('./type');

module.exports = class WhileStatement {
  constructor(test, body) {
    Object.assign(this, { test, body });
  }

  analyze(context) {
    this.test.analyze(context);
    this.test.type.mustBeCompatibleWith(Type.BOOLEAN);
    const bodyContext = context.createChildContextForLoop();
    this.body.forEach(s => s.analyze(bodyContext));
  }

  optimize() {
    this.test = this.test.optimize();
    if (this.test.value === false) {
      return null;
    }
    this.body.map(s => s.optimize()).filter(s => s !== null);
    return this;
  }
};
