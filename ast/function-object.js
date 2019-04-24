// const Type = require('./type');
// const ListType = require('./list-type');
const Variable = require('./variable');
// const IdExpression = require('./identifier-expression');

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

    // cannot properly check nada for paramType
    if (paramTypes === 'nada' && this.params.length > 0) {
      throw new Error('Function should not have params');
    }
    if (paramTypes.length !== this.params.length) {
      throw new Error(`Number of parameters do not match paramType: ${this.paramTypes}, params:${this.params.length}`);
    }

    // this.params.forEach((p) => {
    //   p.type = the corresponding param type
    // })

    if (this.suite) {
      this.suite.forEach(s => s.analyze(context));
    }
  }
};
