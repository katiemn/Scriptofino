module.exports = class BreakStatement {
  // eslint-disable-next-line class-methods-use-this
  analyze(context) {
    if (!context.inLoop) {
      throw new Error('Break statement outside of loop');
    }
  }
};
