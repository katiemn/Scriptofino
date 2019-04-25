const Type = require('./type');

module.exports = class ErrorLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze() {
    this.type = Type.ERROR;
  }
};
