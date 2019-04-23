module.exports = class IdentifierExpression {
    constructor(id) {
      this.id = id;
    }
    analyze(context, inBinding) {
      const referent = context.lookup(this.id);
      if (inBinding) {
        if (referent) {
          this.referent = referent;
          this.type = this.referent.type;
        }
        return;
      }
      if (!referent) {
        throw new Error(`Variable not declared`);
      }
      this.referent = referent;
      this.type = this.referent.type;
    }
};