module.exports = class AssignmentStatement {
  constructor(targets, sources) {
    Object.assign(this, { targets, sources });
  }

  analyze(context) {
    if (this.targets.length !== this.sources.length) {
      throw new Error('Number of variables does not match number of expressions');
    }
    this.sources.forEach(e => e.analyze(context));
    this.targets.forEach(v => v.analyze(context));
    this.sources.forEach((id, i) => {
      id.type.mustBeCompatibleWith(this.targets[i].type);
      context.cannotRebindToConstantVariable(this.targets[i].id);
    });
  }

  optimize() {
    this.sources.forEach(e => e.optimize());
    this.targets.forEach(v => v.optimize());
    return this;
  }
};
