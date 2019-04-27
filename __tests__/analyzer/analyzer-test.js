/* eslint-disable no-undef */
const fs = require('fs');
const assert = require('assert');
const parse = require('../../syntax/parser');

describe('The semantic analyzer', () => {
  fs.readdirSync(__dirname).forEach((name) => {
    if (name.endsWith('.error')) {
      it(`detects a ${name.replace(/[^a-z]/g, ' ')}`, (done) => {
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, 'utf-8'));
        const errorPattern = RegExp(name.replace(/.error\d*/, '').replace(/-/g, ' ').replace(/\d+/g, ''), 'i');
        assert.throws(() => program.analyze(), errorPattern);
        done();
      });
    } else if (name.endsWith('.sf')) {
      it(`should analyze ${name} without errors`, (done) => {
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, 'utf-8'));
        program.analyze();
        done();
      });
    }
  });
});
