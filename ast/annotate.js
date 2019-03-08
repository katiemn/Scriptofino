module.exports = class Annotation {
    constructor(id, paramTypes, resultTypes) {
      Object.assign(this, { id, paramTypes, resultTypes });
    }
};