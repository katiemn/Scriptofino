/* eslint-disable no-undef */
/*
 * Generator Tests
 *
 * Tests that the generated target code, when run, produces the expected output.
 */

const fs = require('fs');
// const assert = require('assert');
// const parse = require('../../syntax/parser');
const { spawn } = require('child_process');
const { compile } = require('../../sf');
require('../../backend/javascript-generator');

describe('The code generator', () => {
  fs.readdirSync(__dirname).forEach((name) => {
    if (name.endsWith('.sf')) {
      it(`produces a behaviorally correct target for ${name}`, (done) => {
        fs.readFile(`${__dirname}/${name}`, 'utf-8', (err, input) => {
          const target = compile(input, {});
          const child = spawn('node', ['-e', target]);
          let output = '';
          child.stdout.on('data', (data) => { output += data; });
          child.on('close', () => {
            fs.readFile(`${__dirname}/${name}.expected`, 'utf-8', (_err, expected) => {
              expect(output).toEqual(expected);
              done();
            });
          });
        });
      });
    }
  });
});
