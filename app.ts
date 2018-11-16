#!/usr/bin/env node

import sywac from 'sywac';

sywac.option('-l, --lang <languages..>', {
    type: 'array:enum',
    desc: 'Choose one or more programming languages',
    choices: ['js', 'java', 'go', 'ruby', 'rust']
  });

  sywac.positional('<arg:file>', {
    paramsDesc: 'A file that must exist on the local file system',
    mustExist: true
  })

sywac.positional('<string>', { paramsDesc: 'A required string argument' })
.boolean('-b, --bool', { desc: 'A boolean option' })
.number('-n, --num <number>', { desc: 'A number option' })
.help('-h, --help')
.version('-v, --version')
.showHelpByDefault()
.outputSettings({ maxWidth: 75 })
.parseAndExit()
.then((argv: any) => {
  console.log(JSON.stringify(argv, null, 2))
});

