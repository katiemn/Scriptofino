const Type = require('./type');

module.exports = class ListType extends Type {
  constructor(type) {
    super('list');
    this.elementType = type;
  }
};
