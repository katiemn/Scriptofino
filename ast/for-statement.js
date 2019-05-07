const Variable = require('./variable');
const Type = require('./type');

module.exports = class ForStatement {
  constructor(id, expression, body) {
    Object.assign(this, { id, expression, body });
  }

  analyze(context) {
    this.expression.forEach(e => e.analyze(context));
    const bodyContext = context.createChildContextForLoop();
    this.id = new Variable(this.id, Type.NUMBER, false);
    bodyContext.add(this.id);
    this.body.forEach(e => e.analyze(bodyContext));
  }
};
