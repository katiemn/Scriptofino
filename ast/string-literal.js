const Type = require('./type');

module.exports = class StringLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze() {
    this.type = Type.STRING;
    return this;
  }
};
