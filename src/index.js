import LunchAppController from './controllers/LunchAppController';
import './styles/index.css';

document.addEventListener('DOMContentLoaded', () => {
  const lunchAppController = new LunchAppController();

  lunchAppController.init();
});
