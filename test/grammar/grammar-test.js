/*
 * from https://github.com/rtoal/plainscript/blob/master/test/grammar/grammar-test.js
 *
 * Grammar Tests
 */

const fs = require('fs');
const assert = require('assert');
const parse = require('../../syntax/parser');

describe('The grammar', () => {
  fs.readdirSync(__dirname).forEach((name) => {
    if (name.endsWith('.sf')) {
      it(`matches the program ${name}`, (done) => {
        fs.readFile(`${__dirname}/${name}`, 'utf-8', (err, input) => {
          // In this test we just care that it parses without errors
          assert.ok(parse(input));
          done();
        });
      });
    } else if (name.endsWith('.error')) {
      it(`detects a syntax error in ${name}`, (done) => {
        fs.readFile(`${__dirname}/${name}`, 'utf-8', (err, input) => {
          // We always wrap Ohm failures in an error with text "Syntax Error"
          assert.throws(() => parse(input), /Syntax Error/);
          done();
        });
      });
    }
  });
});