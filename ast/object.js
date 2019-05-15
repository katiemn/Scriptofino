const Type = require('./type');

module.exports = class ObjectLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze() {
    this.type = Type.OBJECT;
  }

  optimize() {
    return this;
  }
};
