import './css/index.css';
import App from './App';

localStorage.setItem('restaurants', JSON.stringify([]));
const root = document.getElementById('root');
new App({ $parent: root }).render();
