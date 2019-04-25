const Variable = require('./variable');

module.exports = class VariableDeclaration {
  constructor(ids, initializers, isMutable) {
    Object.assign(this, { ids, initializers, isMutable });
  }

  analyze(context) {
    this.initializers.analyze(context);
    this.variables = new Variable(this.ids, this.initializers.type, this.isMutable);
    context.add(this.variables);
  }
};
