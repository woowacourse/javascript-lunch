// components
import App from './components/App';
import GNB from './components/GNB';
import Modal from './components/Modal';
import Select from './components/Select';
import RestaurantForm from './components/RestaurantForm';
import RestaurantList from './components/RestaurantList';
import RestaurantItem from './components/RestaurantItem';

// styles
import './components/global.css';

window.customElements.define('app-gnb', GNB);
window.customElements.define('app-modal', Modal);
window.customElements.define('app-select', Select, { extends: 'select' });
window.customElements.define('app-restaurant-form', RestaurantForm, { extends: 'form' });
window.customElements.define('app-restaurant-item', RestaurantItem, { extends: 'li' });
window.customElements.define('app-restaurant-list', RestaurantList, { extends: 'ul' });

const app = new App();
app.start();
