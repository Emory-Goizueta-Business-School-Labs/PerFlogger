PerFlogger
======
**PerFlogger** is a CLI for tracking performance items in accordance with Emory's performance management process.

## Usage
**PerFlogger** is currently in development. To get going locally clone the repository, and then build the js files from the TypeScript source.

Running locally uses `npm run-script cli`:

```
$ npm run-script cli -- help
Usage: cli [options] [command]

Options:
  -V, --version      output the version number
  -h, --help         output usage information

Commands:
  log
  add [options]
  rm <id> [id...]
  print [path]
  set <key>=<value>
```

## Roadmap
- **v1.0:** everything needed to output a document that matches the available performance log document
- List items by competency
- "Groom" items by rolling individual items into higher-level, longer-term work
- Associate other employees with tasks

## Version 
* 0.1
