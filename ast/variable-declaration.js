const Variable = require('./variable');

module.exports = class VariableDeclaration {
  constructor(ids, type, initializers, isMutable) {
    // eslint-disable-next-line object-curly-newline
    Object.assign(this, { ids, type, initializers, isMutable });
  }

  analyze(context) {
    this.initializers.analyze(context);
    // this check is not correct
    if (this.type !== '') {
      // throw new Error(`${this.type}`);
      let otherType = this.initializers.type;
      if (otherType === undefined) {
        // throw new Error(`${otherType}`);
        // eslint-disable-next-line prefer-destructuring
        otherType = this.initializers.callee.referent.annotation.resultTypes[0];
      } else if (this.initializers.type.name !== undefined) {
        otherType = this.initializers.type.name;
      }
      if (this.type !== otherType && this.type !== 'objecto') {
        throw new Error('Type does not match initializer');
      }
      this.variables = new Variable(this.ids, this.type, this.isMutable);
    } else {
      this.variables = new Variable(this.ids, this.initializers.type, this.isMutable);
    }
    context.add(this.variables);
  }
};
