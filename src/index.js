import '../templates/style.css';
import App from './App';

const $app = document.getElementById('app');
if ($app instanceof HTMLDivElement) {
  new App($app);
}
