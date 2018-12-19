import { Data } from '../data/data';

let data = new Data('perflog', 'user', 'password', {
  dialect: "sqlite"
});

console.log(data.competencies.get());