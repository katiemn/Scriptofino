const Type = require('./type');
const ListType = require('./list-type');
const Variable = require('./variable');
const IdExpression = require('./identifier-expression');
module.exports = class FunctionObject {
  constructor(id, paramTypes, resultTypes, params, suite) {
    Object.assign(this, { id, paramTypes, resultTypes, params, suite });
  }
  
 //for pre-defined functions
  get isExternal() {
    return !this.function.suite;
  }
  analyze(context) {
    //cannot properly check nada for paramType
    if (this.paramTypes === 'nada' && this.params.length > 0) {
      throw new Error('Function should not have params');
    }
    if (this.params.length !== this.paramTypes.length) {
     throw new Error(`Number of parameters do not match paramType:${this.paramTypes}, params:${this.params.length}`);
    }
    //finish checks with 'nada' type  

    if (this.suite) {
      this.params.forEach((p, i) => {
        const v = new Variable(p, this.paramTypes[i], false);
        this.params[i] = v;
        context.add(v);
      });
      this.suite.forEach(s => s.analyze(context));
    }
  }
};