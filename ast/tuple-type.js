const Type = require('./type');

module.exports = class TupleType extends Type {
  constructor(type) {
    super('tuple');
    this.type = 'tuple';
    this.elementType = type;
  }
};
