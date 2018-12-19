import { App } from '../app';
import program from 'commander';
import readline from 'readline';
import LogController from '../controllers/logController';
import ConfigController from '../controllers/configController';

const app = new App();
app.init().then((app) => {
    program
    .version('0.1.0');

    program
    .command('log')
    .action(() => {
        let logController = new LogController(app.data.logItems, app.data.competencies);
        logController.index();
    });

    program
    .command('add')
    .option('-c, --comments [comments]')
    .option('-d, --date [date]')
    .option('-C, --competencies [competencies]')
    .action((args) => {
        let logController = new LogController(app.data.logItems, app.data.competencies);
        let logItem = {
            comments: args.comments || '',
            date: args.date as Date || new Date(),
            competencies: args.competencies || []
        }

        logController.create(logItem);
        return;
    });

    program
    .command('rm <id> [id...]')
    .action((id: string, args: string[] = []) => {
        let logController = new LogController(app.data.logItems, app.data.competencies);
        args.unshift(id);
        logController.delete(args);
    });

    program
    .command('print [path]')
    .action((path: string = '.') => {
        let logController = new LogController(app.data.logItems, app.data.competencies);
        logController.print(path);
    });

    program
    .command('set <key>=<value>')
    .action((key:string, value:string) => {
        let configController = new ConfigController(app.data.settings);
        configController.set(key, value);
    });
    

    program.parse(process.argv);
});

