import Sequelize = require("sequelize");

export interface LogItemAttributes {
    id?: number;
    date: Date;
    comments: string;
    competencies: string;
    createdAt?: string;
    updatedAt?: string;
}

export type LogItemInstance = Sequelize.Instance<LogItemAttributes> & LogItemAttributes;

export default (sequalize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<LogItemAttributes> = {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      date: { type: Sequelize.DATE, allowNull: false },
      comments: { type: Sequelize.TEXT, allowNull: false },
      competencies: { type: Sequelize.STRING, allowNull: false }
    };
    return sequalize.define<LogItemInstance, LogItemAttributes>("LogItem", attributes);
 };