const FunctionObject = require('./function-object');

module.exports = class FunctionDeclaration {
  constructor(annotation, id, params, suite) {
    Object.assign(this, { annotation, id, params, suite });
    this.function = new FunctionObject(this.annotation.id, this.annotation.paramTypes, this.annotation.resultTypes, params, suite);
  }
  // get isExternal() {
  //   return !this.function.suite;
  // }
  analyze(context) {
    context.add(this.function);
    this.function.analyze(context.createChildContextForFunctionBody(this));
  }
};