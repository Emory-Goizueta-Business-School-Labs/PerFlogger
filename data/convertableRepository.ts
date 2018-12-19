import SequelizeRepository from "./sequelizeRepository";
import Sequelize from "sequelize";
import IIdentifiable from './iidentifiable';

export default abstract class ConvertableRepository<T extends IIdentifiable, TModel extends Sequelize.Model<TInstance,TAttributes>, TInstance extends Sequelize.Instance<TAttributes>, TAttributes> {
    baseRepository: SequelizeRepository<TModel, TInstance, TAttributes>;

    constructor(baseRepository: SequelizeRepository<TModel, TInstance, TAttributes>) {
        this.baseRepository = baseRepository;
    }

    public sync(): Promise<TModel> {
        return this.baseRepository.sync();
    }

    public init(): Promise<TModel> {
        return this.sync();
    }

    public get(): Promise<(T | null)[] | undefined> {
        return this.baseRepository.get().then(this.convertInstancesToItems);
    }

    public getById(id: number): Promise<T | null> {
        return this.baseRepository.getById(id).then(this.convertInstanceToItem);
    }

    public create(item: T): Promise<T | null> {
        return this.baseRepository.create(this.convertItemToAttributes(item)).then(this.convertInstanceToItem);
    }

    public update(item: T) {
        return this.baseRepository.update(this.convertItemToAttributes(item)).then(() => item);
    }

    public delete(id: number): Promise<T>;
    public delete(item: T): Promise<T>;
    public delete(idOrItem: number | T): Promise<T | null> {
        let id: number;

        if (typeof idOrItem === 'number') {
            id = idOrItem;
        }
        else {
            id = idOrItem.id!;
        }

        return new Promise ((resolve, reject) => {
            this.baseRepository.getById(id).then(instance => {
                let item = this.convertInstanceToItem(instance);
                if (instance == null) {
                    resolve(item);
                    return;
                }

                instance.destroy().then(() => resolve(item));
            })
        });
    }

    private convertInstancesToItems(instances: TInstance[]): (T | null)[] | undefined {
        if (instances )

        return instances.map(this.convertInstanceToItem);
    }

    abstract convertInstanceToItem(instance: TInstance | null): T | null;
    abstract convertItemToAttributes(item: T): TAttributes;
}