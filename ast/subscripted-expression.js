module.exports = class SubscriptedExpression {
  constructor(variable, subscript) {
    Object.assign(this, { variable, subscript });
  }

  analyze(context) {
    this.variable.analyze(context);
    this.subscript.analyze(context);
    this.referent = this.variable.referent;
    let varType;
    // console.log(`Type: ${JSON.stringify(this.variable.referent.type.elementType)}`);
    if (this.variable.referent.type.elementType === undefined) {
      this.type = this.variable.referent.type;
      varType = this.variable.type;
    } else {
      this.type = this.variable.referent.type.elementType.name;
      varType = this.variable.type.type;
    }
    if (JSON.stringify(varType) !== JSON.stringify('lista')
    && JSON.stringify(varType) !== JSON.stringify('tuple')
    && JSON.stringify(varType) !== JSON.stringify('diccionario')) {
      // console.log(`${JSON.stringify(this.variable.type)}`);
      throw new Error('Subscripted Id must be tuple dictionary or list');
    }
  }
};

// this.variable.referent.type.name
