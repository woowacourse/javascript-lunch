// components
import Modal from './view/components/Modal';
import RestaurantForm from './view/components/RestaurantForm';
import Select from './view/components/select/Select';
import GNB from './view/components/GNB';

// styles
import './view/styles/global.css';
import './view/styles/gnb.css';
import './view/styles/modal.css';
import './view/styles/Select.css';

// imgs
import './view/imgs/add-button.png';

RestaurantForm();
Modal();

window.customElements.define('app-select', Select, { extends: 'select' });
window.customElements.define('app-gnb', GNB);
