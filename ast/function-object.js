module.exports = class FunctionObject {
    constructor(id, paramTypes, resultTypes, params, suite) {
      Object.assign(this, { id, paramTypes, resultTypes, params, suite });
    }
};