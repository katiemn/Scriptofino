module.exports = class ReturnStatement {
  constructor(returnValue) {
    this.returnValue = returnValue;
  }

  analyze(context) {
    context.assertInFunction('Return statement outside function');
    if (this.returnValue) {
      this.returnValue.analyze(context);
      // TODO Make sure function in context has result type is NOT nada
      // Make sure type of returnValue === resultType of currentFunction
      //    in context
    } else {
      // TODO Make sure function in context is result type nada
    }
  }

  optimize() {
    if (this.returnValue) {
      this.returnValue = this.returnValue.optimize();
    }
    return this;
  }
};
