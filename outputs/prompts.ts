import readline from 'readline';
import SelectedCompetency from '../models/selectedCompetency';
import chalk from 'chalk';

function prompt(text: string): Promise<string> {
    return new Promise(resolve => {
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        rl.question(`${ text }: `,(answer) => {
            resolve(answer);
            rl.close();
        });
    });
}

function promptWithDefault<T>(text: string, defaultValue: string, converter: (value: string) => T): Promise<T> {
    return new Promise(resolve => {
        prompt(`${text} (${defaultValue})`)
        .then(ans => {
            let answer;
    
            if (ans === '') {
                ans = defaultValue;
            }

            answer = converter(ans);

            if (answer !== null && typeof answer !== 'undefined') {
                resolve(answer);
                return;
            }

            resolve(promptWithDefault(text, defaultValue, converter));
            return;
        });
    });
}

export function confirmDelete(item: LogItem): Promise<boolean> {    
    return new Promise((resolve) => {
        let confirmationWord = 'confirm';

        prompt(`Are you sure you want to delete? (enter "${ confirmationWord }" to delete)`)
        .then(answer => resolve(answer === confirmationWord));
    });
}

export function date(defaultDate: Date): Promise<Date> {
    return promptWithDefault<Date>('Date', defaultDate.toDateString(), str => {
        console.log('input', str);
        return new Date(str);
    });
}

export function comments(defaultComments: string): Promise<string> {
    return promptWithDefault<string>('Comments', defaultComments, str => str);
}

export function competencies(competencies: Array<Competency>): Promise<Array<Competency>> {
    let selectedCompetencies: Array<Competency> = [];
    
    let p = promptCompetency(competencies[0]);

    for (let i = 1; i < competencies.length; i++) {
        p = p.then((s: SelectedCompetency) => {
            if (s.selected) {
                selectedCompetencies.push(s.competency);
            }

            return promptCompetency(competencies[i]);
        });
    }

    return p.then((s: SelectedCompetency) => {
        if (s.selected) {
            selectedCompetencies.push(s.competency);
        }

        return selectedCompetencies;
    });
}
    
    

function promptCompetency(competency: Competency): Promise<SelectedCompetency> {
    console.log(chalk.bold(competency.title.toUpperCase()));

    for (let i = 0; i < competency.descriptions.length; i++) {
        console.log('');
        console.log(competency.descriptions[i].title);
        console.log(competency.descriptions[i].text);
    }

    return prompt(`Does this demonstrate ${ competency.title.toLowerCase() }? (y/n)`).then(ans => {
        if (ans === 'y') {
            return true;
        }

        return false;
    }).then(b => new SelectedCompetency(competency, b));
}
