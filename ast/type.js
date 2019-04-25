class Type {
  constructor(name) {
    this.name = name;
    Type.cache[name] = this;
  }

  mustBeCompatibleWith(otherType) {
    if (!this.isCompatibleWith(otherType)) {
      throw new Error('Type mismatch error');
    }
  }

  mustBeMutuallyCompatibleWith(otherType) {
    if (!(this.isCompatibleWith(otherType) || otherType.isCompatibleWith(this))) {
      throw new Error('Must have mutually compatible operands');
    }
  }

  isCompatibleWith(otherType) {
    return JSON.stringify(this) === JSON.stringify(otherType);
  }
}

Type.cache = {};
Type.BOOLEAN = new Type('boolean');
Type.NUMBER = new Type('num');
Type.STRING = new Type('string');
Type.NONE = new Type('nada');

Type.forName = name => Type.cache[name];

module.exports = Type;
