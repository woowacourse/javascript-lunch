import './css/index.css';
import App from './App';

const fragment = document.createDocumentFragment();
new App({ $parent: fragment }).render();

document.getElementById('root').append(fragment);
