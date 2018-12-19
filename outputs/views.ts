import { sprintf, vsprintf } from 'sprintf';
import chalk from 'chalk';

export function error(error: Error) {
    console.log(`${ chalk.red.bold(error.name) }: ${ chalk.red.bold(error.message) }`);
}

export function log(items: Array<LogItem | null> | undefined) {    
    if (typeof items === 'undefined') {
        return;
    }

    items.forEach((item) => {
        if (item === null) {
            return;
        }

        console.log(`
${ chalk.yellow(`Log ${ item.id }`) } 
Date: ${ item.date.toDateString() }

    ${ item.comments }

`);

        item.competencies.forEach((competency) => {
            console.log(`    ${ competency.title }`);
        });

        console.log('');
    });
}

export function confirmedDelete(items: (LogItem | null)[]) {
    console.log(chalk.red(`Log(s) ${ items.map(i => {
        if (i === null) {
            return 0;
        }
        return i.id;
    }).join(', ') } deleted`));
};

export function cancelledDelete(item: LogItem) {
    console.log(`Delete cancelled`);
}

export function details(item: LogItem | null) {
    if (item === null) {
        return;
    }

    console.log(chalk.green.bold('Successfully added new log'));
    console.log(`Id: ${ item.id }
Date: ${ item.date.toDateString() }
Comments: ${ item.comments }
Competencies: `);

    for (let i = 0; i < item.competencies.length; i++) {
        console.log(`- ${ item.competencies[i].title }`);
    }
}