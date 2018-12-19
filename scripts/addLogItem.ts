import { App } from '../app';
import program from 'commander';

program
    .option('-d, --date [date]', 'Specify the date')
    .option('-c, --comments <text>', 'Specify comments')
    .option('-C, --competencies [int]', 'The competencies demonstrated')
    .parse(process.argv);

console.log('Date %s', program.date);
console.log('Comments %s', program.comments);
console.log('Competencies %s', program.competencies);

let app = new App();



// print process.argv
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});

var item: LogItem = {
    date: program.date as Date || Date.now(),
    comments: program.comments,
    competencies: []
};

console.log(item);

app.data.logItems.create(item).then(item => console.log(item)).catch(err => console.log(err));