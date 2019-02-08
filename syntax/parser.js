const fs = require('fs');
const ohm = require('ohm-js');
const withIndentsAndDedents = require('./preparser');

const grammar = ohm.grammar(fs.readFileSync('./syntax/ScriptoFino.ohm'));

module.exports = (text) => {
    const match = grammar.match(withIndentsAndDedents(text));
    if (!match.succeeded()) {
      throw new Error(`Syntax Error: ${match.message}`);
    }
    return true;
  };