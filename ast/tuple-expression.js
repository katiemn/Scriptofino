const TupleType = require('./tuple-type');

module.exports = class TupleExpression {
  constructor(members) {
    this.members = members;
  }

  analyze(context) {
    const memTypes = [];
    this.members.forEach((mem) => {
      mem.analyze(context);
      memTypes.push(mem.type);
    });
    this.type = new TupleType(memTypes);
  }

  optimize() {
    return this;
  }
};
