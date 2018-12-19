import Sequelize from 'sequelize';
import { LogItemInstance, LogItemAttributes } from './sequelizeModels/logItem';
import { CompetencyRepository } from './competencyRepository';
import ConvertableRepository from './convertableRepository';
import SequelizeRepository from './sequelizeRepository';

export class LogItemsRepository extends ConvertableRepository<LogItem, Sequelize.Model<LogItemInstance,LogItemAttributes>, LogItemInstance, LogItemAttributes> {
    convertInstanceToItem(instance: LogItemInstance | null): LogItem | null {
        if (instance === null) {
            return null;
        }

        return {
            id: instance.id,
            date: instance.date,
            comments: instance.comments,
            competencies: JSON.parse(instance.competencies).map((i: number) => {
                return this.competencies.getById(i);
            })
        };
    }
    convertItemToAttributes(item: LogItem): LogItemAttributes {
        return {
            id: item.id,
            date: item.date,
            comments: item.comments,
            competencies: JSON.stringify(item.competencies.map(c => c.id))
        }; 
    }
    private competencies: CompetencyRepository

    constructor(model: Sequelize.Model<LogItemInstance,LogItemAttributes>, competencyRepository: CompetencyRepository) {
        super(new SequelizeRepository(model));
        
        this.competencies = competencyRepository;
    }
}