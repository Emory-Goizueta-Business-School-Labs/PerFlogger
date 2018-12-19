import { Data } from './data/data';
import { resolve } from 'path';
require('dotenv').config();

export class App {
  public data: Data;

  constructor() {
    this.data = new Data(
      process.env.DB!, 
      process.env.DB_USERNAME!,
      process.env.DB_PASSWORD!,
      {
        dialect: process.env.DB_DIALECT,
        storage: process.env.DB_STORAGE,
        logging: false,
        operatorsAliases: false
      });
  }

  public init(): Promise<App> {
    return new Promise(resolve => {
      this.data.init().then(() => resolve(this));
    });    
  }
}