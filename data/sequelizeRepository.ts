import Sequelize = require("sequelize");

export default class SequelizeRepository<TModel extends Sequelize.Model<TInstance, TAttributes>, TInstance extends Sequelize.Instance<TAttributes>, TAttributes> {
    private model: TModel;

    constructor(model: TModel) {
        this.model = model;
    }

    public sync(): Promise<TModel> {
        return new Promise<TModel>((resolve, reject) => {            
            this.model.sync().then(resolve).catch(reject);
        });
    }

    public init(): Promise<TModel> {
        return this.sync();
    }

    public get(options?: Sequelize.FindOptions<TAttributes & {}>): Promise<Array<TInstance>> {
        return new Promise<Array<TInstance>>(resolve => {
            this.model.findAll(options).then(resolve);
        });
    }

    public getFirst(options?: Sequelize.FindOptions<TAttributes & {}>): Promise<TInstance | null> {
        return new Promise<TInstance | null>(resolve => {
            return this.model.findOne(options).then(resolve);
        });
    }

    public getById(id: number): Promise<TInstance | null> {
        return new Promise<TInstance | null>(resolve => {
            this.model.findByPk(id).then(resolve);
        });
    }

    public create(values?: TAttributes): Promise<TInstance> {
        return new Promise<TInstance> (resolve => {
            this.model.create(values).then(resolve);
        });        
    }

    public update(values: Partial<TAttributes>): Promise<[number, TInstance[]]> {
        return new Promise(resolve => {
            this.model.update(values).then(resolve);
        });
    }

    public delete(instance: TInstance): Promise<void> {
        return new Promise(resolve => {
            instance.destroy().then(resolve);
        });
    }
}