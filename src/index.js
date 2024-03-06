// components
import GNB from './view/components/GNB';
import Modal from './view/components/Modal';
import Select from './view/components/Select';
import RestaurantForm from './view/components/RestaurantForm';

// styles
import './view/styles/global.css';
import './view/styles/GNB.css';
import './view/styles/Modal.css';
import './view/styles/Select.css';
import './view/styles/RestaurantForm.css';

// imgs
import './view/imgs/add-button.png';

// Modal();

window.customElements.define('app-gnb', GNB);
window.customElements.define('app-modal', Modal);
window.customElements.define('app-select', Select, { extends: 'select' });
window.customElements.define('app-restaurant-form', RestaurantForm, { extends: 'form' });
