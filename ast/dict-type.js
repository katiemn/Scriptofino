const Type = require('./type');
module.exports = class DictType {
  constructor(dictType) {
    Object.assign(this, { dictType });
  }
};