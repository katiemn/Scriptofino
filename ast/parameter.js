module.exports = class Parameter {
  constructor(id, defaultExpression) {
    Object.assign(this, { id, defaultExpression });
  }

  analyze(context) {
    if (this.defaultExpression) {
      this.defaultExpression.analyze();
    }
    context.add(this);
  }
};
