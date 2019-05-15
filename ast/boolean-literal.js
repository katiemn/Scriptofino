const Type = require('./type');

module.exports = class BooleanLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze() {
    this.type = Type.BOOLEAN;
    return this;
  }

  optimize() {
    return this;
  }
};
