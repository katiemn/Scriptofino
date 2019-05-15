const FunctionObject = require('./function-object');

module.exports = class FunctionDeclaration {
  constructor(annotation, id, params, suite) {
    Object.assign(this, { id });
    this.function = new FunctionObject(annotation, id, params, suite);
  }

  analyze(context) {
    context.add(this.function);
    this.function.analyze(context.createChildContextForFunctionBody(this));
  }

  optimize() {
    return this;
  }
};
