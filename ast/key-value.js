module.exports = class KeyValuePair {
    constructor(key,value) {
        Object.assign(this, { key, value });
    }
};