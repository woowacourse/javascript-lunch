// components
import Modal from './view/components/Modal';
import RestaurantForm from './view/components/RestaurantForm';
import Select from './view/components/Select';
import GNB from './view/components/GNB';

// styles
import './view/styles/global.css';
import './view/styles/modal.css';
import './view/styles/RestaurantForm.css';
import './view/styles/Select.css';
import './view/styles/gnb.css';

// imgs
import './view/imgs/add-button.png';

Modal();

window.customElements.define('app-select', Select, { extends: 'select' });
window.customElements.define('app-restaurant-form', RestaurantForm, { extends: 'form' });
window.customElements.define('app-gnb', GNB);
