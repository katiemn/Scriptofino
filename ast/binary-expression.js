const Type = require('./type');
module.exports = class BinaryExpression {
    constructor(op, left, right) {
      Object.assign(this, { op, left, right });
    }

    analyze(context) {
      this.left.analyze(context);
      this.right.analyze(context);
      if (['<', '<=', '>=', '>'].includes(this.op)) {
        this.left.type.mustBeCompatibleWith(Type.NUMBER);
        this.right.type.mustBeCompatibleWith(Type.NUMBER);
        this.type = Type.BOOLEAN;
      } else if (['es', 'no es'].includes(this.op)) {
        this.left.type.mustBeMutuallyCompatibleWith(this.right.type);
        this.type = Type.BOOLEAN;
      } else if (['yy', 'oo'].includes(this.op)) {
        this.left.type.mustBeCompatibleWith(Type.BOOLEAN);
        this.right.type.mustBeCompatibleWith(Type.BOOLEAN);
        this.type = Type.BOOLEAN;
      } else {
        this.left.type.mustBeCompatibleWith(Type.NUMBER);
        this.right.type.mustBeCompatibleWith(Type.NUMBER);
        this.type = Type.NUMBER;
      }
    }
};