const ListType = require('./list-type');

module.exports = class ListExpression {
  constructor(members) {
    this.members = members;
  }

  analyze(context) {
    this.members.forEach(member => member.analyze(context));
    const memType = this.members[0].type;
    this.members.forEach((mem) => {
      if (!mem.type.isCompatibleWith(memType)) {
        throw new Error('Type mismatch in list');
      }
    });
    this.type = new ListType(memType);
  }
};
