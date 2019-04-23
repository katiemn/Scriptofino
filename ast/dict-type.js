const Type = require('./type');
module.exports = class DictType extends Type {
  constructor(keyType, valueType) {
    super('dictionary');
    Object.assign(this, { keyType, valueType });
  }
  getElementType(){
    return this.valueType;
  }
};