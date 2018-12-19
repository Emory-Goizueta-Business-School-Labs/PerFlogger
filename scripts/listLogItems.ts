import { App } from '../app';

let app = new App();

app.data.logItems.get().then(items => console.log(items)).catch(err => console.log(err));