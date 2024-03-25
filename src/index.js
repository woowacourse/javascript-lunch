import App from './App';
import '../style.css';
import RestaurantDetailModal from './components/Modal/RestaurantDetailModal';

window.customElements.define('restaurant-detail-modal', RestaurantDetailModal, { extends: 'div' });

const app = new App();
