#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sywac_1 = __importDefault(require("sywac"));
sywac_1.default.option('-l, --lang <languages..>', {
    type: 'array:enum',
    desc: 'Choose one or more programming languages',
    choices: ['js', 'java', 'go', 'ruby', 'rust']
});
sywac_1.default.positional('<arg:file>', {
    paramsDesc: 'A file that must exist on the local file system',
    mustExist: true
});
sywac_1.default.positional('<string>', { paramsDesc: 'A required string argument' })
    .boolean('-b, --bool', { desc: 'A boolean option' })
    .number('-n, --num <number>', { desc: 'A number option' })
    .help('-h, --help')
    .version('-v, --version')
    .showHelpByDefault()
    .outputSettings({ maxWidth: 75 })
    .parseAndExit()
    .then((argv) => {
    console.log(JSON.stringify(argv, null, 2));
});
