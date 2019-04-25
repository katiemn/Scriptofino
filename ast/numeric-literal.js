const Type = require('./type');

module.exports = class NumericLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze() {
    this.type = Type.NUMBER;
    return this;
  }
};
