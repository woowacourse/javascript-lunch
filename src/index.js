import Header from './components/Header';
import Main from './components/Main';

import './styles/index.css';

const header = new Header();
const main = new Main();

document.getElementById('header').innerHTML = header.render();
document.getElementById('main').innerHTML = main.render();
