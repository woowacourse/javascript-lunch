// components
import GNB from './view/components/GNB';
import AppModal from './view/components/AppModal';
import Select from './view/components/Select';
import RestaurantForm from './view/components/RestaurantForm';

// styles
import './view/styles/global.css';
import './view/styles/GNB.css';
import './view/styles/AppModal.css';
import './view/styles/Select.css';
import './view/styles/RestaurantForm.css';

// imgs
import './view/imgs/add-button.png';

// Modal();

window.customElements.define('app-gnb', GNB);
window.customElements.define('app-modal', AppModal);
window.customElements.define('app-select', Select, { extends: 'select' });
window.customElements.define('app-restaurant-form', RestaurantForm, { extends: 'form' });
