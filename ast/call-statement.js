module.exports = class Call {
  constructor(callee, args) {
    Object.assign(this, { callee, args });
  }

  analyze(context) {
    this.callee.analyze(context);
    this.args.forEach(arg => arg.analyze(context));
    context.assertIsFunction(this.callee.referent);
    this.type = this.callee.referent.resultTypes;
    this.checkArgumentMatching(this.callee.referent);
    if (this.args.length !== this.callee.referent.annotation.paramTypes.length) {
      throw new Error('Not enough args in call');
    }
    this.args.forEach((arg, index) => {
      const argType = arg.expression.type.name;
      if (argType !== 'objecto') {
        if (this.callee.referent.annotation.paramTypes[index] !== 'objecto') {
          if (JSON.stringify(argType)
          !== JSON.stringify(this.callee.referent.annotation.paramTypes[index])) {
            throw new Error('Type mismatch in args and params');
          }
        }
      }
    });
  }

  checkArgumentMatching(callee) {
    this.args.forEach((arg, index) => {
      if (index >= callee.params.length) {
        throw new Error('Too many arguments in call');
      }
    });
  }
};
