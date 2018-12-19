import Sequelize from "sequelize";
import SequelizeRepository from "./sequelizeRepository";
import ConvertableRepository from "./convertableRepository";
import Setting from '../models/setting';
import { SettingInstance, SettingAttributes } from './sequelizeModels/setting';


export default class SettingsRepository extends ConvertableRepository<Setting, Sequelize.Model<SettingInstance,SettingAttributes>, SettingInstance, SettingAttributes> {
    convertInstanceToItem(instance: SettingInstance | null): Setting | null {
        return instance;
    }    

    convertItemToAttributes(item: Setting) {
        return item;
    }

    public create(item: Setting): Promise<Setting | null> {
        return this.createOrUpdate(item);
    }

    public getByKey(key: string): Promise<Setting | null> {
        return this.baseRepository.getFirst({
            where: {
                key
            }
        }).then(this.convertInstanceToItem);
    }

    public createOrUpdate(item: Setting): Promise<Setting | null> {
        return this.getByKey(item.key).then(dbItem => {
            if (dbItem === null) {
                return this.create(item);
            }

            return this.update(item);
        });
    }
}