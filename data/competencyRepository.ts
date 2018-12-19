const data = require('./competencies.json');

export class CompetencyRepository {
    private competencies: Array<Competency>;

    constructor() {
        this.competencies = data;
    }

    public get(): Promise<Array<Competency>> {
        return new Promise((resolve, reject) => {
            resolve(this.competencies);
        });
    }

    public getById(id: number) {
        return this.competencies.filter(c => {
            return c.id === id;
        })[0];
    }
}