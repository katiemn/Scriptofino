module.exports = class BreakStatement {
    analyze(context) {
        if (!context.inLoop) {
            throw new Error('Break statement outside of loop');
        }
    }
};