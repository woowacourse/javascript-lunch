import Header from './components/Header';
import './styles/index.css';

const header = new Header();

document.querySelector('body').innerHTML = header.render();
