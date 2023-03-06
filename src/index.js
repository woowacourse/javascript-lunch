import '../templates/style.css';
import App from './App';
import InitialData from './data/InitialData';
import { $ } from './util/dom';

const app = new App($('body'));
app.init(InitialData);
