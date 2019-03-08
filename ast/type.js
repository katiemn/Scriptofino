module.exports = class Type {
    constructor(name) {
      this.name = name;
      Type.cache[name] = this;
    }
};
  

  
