const Type = require('./type');

module.exports = class ListType extends Type {
  constructor(type) {
    super('lista');
    this.type = 'lista';
    this.elementType = type;
  }
};
