import Sequelize from 'sequelize';
import LogItem from './sequelizeModels/logItem';
import Log from './sequelizeModels/log';
import Setting from './sequelizeModels/setting';
import { CompetencyRepository } from './competencyRepository';
import { LogItemsRepository } from './logItemsRepository';
import SettingsRepository from './settingsRepository';
import SequelizeRepository from './sequelizeRepository';
import { LogRepository } from './logRepository';

export class Data {
    private sequelize: Sequelize.Sequelize;
    public competencies: CompetencyRepository;
    public logs: LogRepository;
    public logItems: LogItemsRepository;
    public settings: SettingsRepository;

    constructor(connectionString: string);
    constructor(database: string, username: string, password: string, options: Sequelize.Options | undefined);
    constructor(databaseOrConnectionString: string, username?: string, password?: string, options?: Sequelize.Options | undefined) {
        if (arguments.length >= 3) {
            this.sequelize = new Sequelize(databaseOrConnectionString!, username!, password!, options);
        }
        else {
            this.sequelize = new Sequelize(databaseOrConnectionString!);
        }

        this.competencies = new CompetencyRepository();
        this.logItems = new LogItemsRepository(LogItem(this.sequelize), this.competencies);
        this.logs = new LogRepository(Log(this.sequelize), this.logItems);
        this.settings = new SettingsRepository(new SequelizeRepository(Setting(this.sequelize)));
    }

    public init(): Promise<any> {
        return Promise.all([
            this.logItems.init(),
            this.settings.init(),
            this.sync()
        ]);
    }

    public sync(): Promise<any> {
        return Promise.all([
            this.logItems.sync(),
            this.settings.sync()
        ]);
    }

    public testConnection(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
                resolve();
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
                reject(err);
            });
        });        
    }
}