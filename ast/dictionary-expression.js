const DictionaryType = require('./dict-type');

module.exports = class DictionaryExpression {
  constructor(members) {
    this.members = members;
  }

  analyze(context) {
    this.members.forEach(m => m.analyze(context));
    const keyType = this.members[0].key.type;
    const valType = this.members[0].value.type;
    this.members.forEach((mem) => {
      if (!mem.key.type.isCompatibleWith(keyType) || !mem.value.type.isCompatibleWith(valType)) {
        throw new Error('Type mismatch in dictionary');
      }
    });
    this.type = new DictionaryType(keyType, valType);
  }
};
