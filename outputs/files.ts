import fs, { write } from 'fs';
import { reject } from 'bluebird';

function writeToStream(chunk: any, stream: fs.WriteStream) : Promise<void> {
    return new Promise((resolve, reject) => {
        stream.write(chunk, (err) => {
            if (err) {
                reject(err);
            }

            resolve();
        });
    });
}

function competenciesToHtmlList(competencies: Competency[]): string {    
    return `<ul>
        ${ competencies.map(c => {
            return `<li>${ c.title }</li>`;
        }).join('')}
        </ul>`;
}

function itemToHtmlTableRow(item: LogItem): string {
    return `<tr>
    <td>${ item.date.toDateString() }</td>
    <td>${ item.comments }</td>
    <td>
    ${ competenciesToHtmlList(item.competencies) }
    </td>
    </tr>
    `;
}

export function log(items: (LogItem | null)[], path: string): Promise<void> {
    return new Promise((resolve, reject) => {
        let stream = fs.createWriteStream(`${ path }/log-${ new Date().toISOString() }.md`);
        let p = writeToStream("# Performance Log\n", stream);
        
        p.then(() => {
            writeToStream("\n<table><tr><th colspan='3'>Performance Log for: </th><tr>\n", stream);
        });

        p = p.then(() => {
            writeToStream("<tr><th>Date</th><th>Comments</th><th>Competency</th></tr>\n", stream);
        });

        for (let i = 0; i < items.length; i++) {
            if (items[i] === null) {
                continue;
            }

            p = p.then(() => {
                writeToStream(itemToHtmlTableRow(items[i]!), stream);
            });
        }

        p = p.then(() => {
            writeToStream("</table>", stream)
        });

        p.then(() => {
            stream.close();
            resolve();
        });
    });
}