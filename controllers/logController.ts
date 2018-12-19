import { LogItemsRepository } from "../data/LogItemsRepository";
import * as views from '../outputs/views';
import * as prompts from '../outputs/prompts';
import * as files from '../outputs/files';
import { CompetencyRepository } from "../data/competencyRepository";

export default class LogController {
    private logRepo: LogItemsRepository;
    private competenciesRepo: CompetencyRepository;

    constructor(logRepository: LogItemsRepository, competenciesRepo: CompetencyRepository) {
        this.logRepo = logRepository;
        this.competenciesRepo = competenciesRepo;
    }

    public index() {
        this.logRepo.get().then(views.log).catch(views.error);
    }

    public create(item: LogItem) {
        prompts.date(item.date)
        .then(date => {
            item.date = date;

            return item;
        })
        .then(() => prompts.comments(item.comments))
        .then(comments => {
            item.comments = comments;

            return item;
        })
        .then(() => this.competenciesRepo.get())
        .then(prompts.competencies)
        .then(competencies => {
            item.competencies = competencies;

            return item;
        })
        .then(item => this.logRepo.create(item))
        .then(views.details)
        .catch(views.error);
    }

    public delete(ids: string[]) {
        let idsInt = ids.map(i => parseInt(i, 10));

        let promises = ids.map(i => {
            let idInt = parseInt(i, 10);

            return this.logRepo.getById(idInt)
            .then(item => {
                if (item === null) {
                    return new Promise(resolve => resolve(item);
                }
                return this.logRepo.delete(item).then(item => item);
            });
        });

        Promise.all(promises)
        .then((items: (LogItem | null)[]) => views.confirmedDelete(items))
        .catch(views.error);
    }

    public print(path: string) {
        this.logRepo.get().then(items => {
            files.log(items, path);
        });
    }
}
