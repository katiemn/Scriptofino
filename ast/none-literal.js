const Type = require('./type');

module.exports = class NoneLiteral {
  analyze() {
    this.type = Type.NONE;
  }
};
