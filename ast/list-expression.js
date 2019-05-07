const ListType = require('./list-type');
// const Type = require('./type');

module.exports = class ListExpression {
  constructor(members) {
    this.members = members;
  }

  analyze(context) {
    this.members.forEach(member => member.analyze(context));
    const memType = this.members[0].type;
    this.members.forEach((mem) => {
      // eslint-disable-next-line max-len
      // console.log(`${mem.type} ${memType}`);
      if (!mem.type.isCompatibleWith(memType)) {
        throw new Error('Type mismatch in list');
      }
    });
    this.type = new ListType(memType);
  }
};


// Type.forName(this.annotation.paramTypes[index]), false);
