module.exports = class Variable {
  constructor(id, type, isMutable) {
    Object.assign(this, { id, type, isMutable });
  }

  analyze(context) {
    context.add(this);
  }

  optimize() {
    return this;
  }
};
