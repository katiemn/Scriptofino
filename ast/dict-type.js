const Type = require('./type');

module.exports = class DictType extends Type {
  constructor(keyType, valueType) {
    super('diccionario');
    Object.assign(this, { keyType, valueType });
  }
};
