const Variable = require('./variable');
const IdExpression = require('./identifier-expression');
const DictionaryType = require('./dict-type');
module.exports = class ForStatement {
    constructor(id, expression, body) {
      Object.assign(this, { id, expression, body });
    }
    analyze(context) {
      const getIteratorType = (expression) => {
        //let exp = expression;
        if (expression instanceof IdExpression) {
          expression = expression.referent;
        }
        if (expression.type instanceof DictionaryType) {
          return expression.keyType;
        }
        return expression.elementType;
      };
      this.expression.forEach(e => e.analyze(context));
      const bodyContext = context.createChildContextForLoop();
      this.id = new Variable(this.id.id, getIteratorType(this.expression), false);
      bodyContext.add(this.id);
      this.body.forEach(e => e.analyze(bodyContext));
    }
};