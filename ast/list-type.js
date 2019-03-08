const Type = require('./type');
module.exports = class ListType {
  constructor(listType) {
    Object.assign(this, { listType });
  }
};