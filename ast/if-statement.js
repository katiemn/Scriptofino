module.exports = class IfStatement {
  constructor(tests, consequents, alternate) {
    Object.assign(this, { tests, consequents, alternate });
  }

  analyze(context) {
    this.tests.forEach(test => test.analyze(context));
    this.consequents.forEach((block) => {
      const blockContext = context.createChildContextForBlock();
      block.forEach(statement => statement.analyze(blockContext));
    });
    if (this.alternate) {
      this.alternate.forEach(s => s.analyze(context.createChildContextForBlock()));
    }
  }

  optimize() {
    this.tests.map(test => test.optimize());
    this.consequents.forEach((block) => {
      block.map(statement => statement.optimize().filter(s => s != null));
    });
    this.alternate = this.alternate ? this.alternate.optimize() : null;
    return this;
  }
};
