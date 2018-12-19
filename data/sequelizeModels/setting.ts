import Sequelize = require('sequelize');

export interface SettingAttributes {
    id?: number;
    key: string;
    value: string;
}

export type SettingInstance = Sequelize.Instance<SettingAttributes> & SettingAttributes;

export default (sequalize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<SettingAttributes> = {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        key: { type: Sequelize.TEXT, allowNull: false, unique: true },
        value: { type: Sequelize.TEXT, allowNull: false }
    };
    return sequalize.define<SettingInstance, SettingAttributes>("Setting", attributes);
 };