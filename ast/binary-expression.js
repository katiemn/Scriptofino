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

  optimize() {
    this.left = this.left.optimize();
    this.right = this.right.optimize();
    if (this.op === '+' && JSON.stringify(this.right.value) === '0') return this.left;
    if (this.op === '+' && JSON.stringify(this.left.value) === '0') return this.right;
    return this;
  }
};
