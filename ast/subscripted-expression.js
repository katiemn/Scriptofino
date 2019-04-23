const IdExpression = require('./identifier-expression');
module.exports = class SubscriptedExpression {
    constructor(variable, subscript) {
      Object.assign(this, { variable, subscript });
    }
    analyze(context) {
      this.variable.analyze(context);
      this.subscript.analyze(context);
      if (this.variable instanceof IdExpression) {
        const lookedUpValue = context.lookup(this.variable.id);
        if (lookedUpValue === null) {
          throw new Error('Subscripted id has not been defined');
        }
        this.type = lookedUpValue.type.elementType;
      } else if (this.variable instanceof SubscriptedExpression) {
        this.type = this.variable.variable.type.elementType.elementType;
      }
    }
};