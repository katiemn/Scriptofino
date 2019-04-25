module.exports = class SubscriptedExpression {
  constructor(variable, subscript) {
    Object.assign(this, { variable, subscript });
  }

  analyze(context) {
    this.variable.analyze(context);
    this.subscript.analyze(context);
    this.referent = this.variable.referent;
    this.type = this.variable.referent.type.name;
    if (this.variable.referent.type.name !== 'list'
    && this.variable.referent.type.name !== 'tuple'
    && this.variable.referent.type.name !== 'dictionary') {
      throw new Error('Subscripted Id must be tuple dictionary or list');
    }
  }
};
