import WebController from './service/WebController';
// components
import GNB from './view/components/GNB';
import Modal from './view/components/Modal';
import Select from './view/components/Select';
import RestaurantForm from './view/components/RestaurantForm';
import RestaurantList from './view/components/RestaurantList';
import RestaurantItem from './view/components/RestaurantItem';
import RestaurantDetail from './view/components/RestaurantDetail';

// styles
import './view/styles/global.css';
import './view/styles/Gnb.css';
import './view/styles/Modal.css';
import './view/styles/Select.css';
import './view/styles/RestaurantForm.css';
import './view/styles/RestaurantList.css';
import './view/styles/Tab.css';
import './view/styles/RestaurantDetail.css';

// imgs
import './view/imgs/add-button.png';
import './view/imgs/category-korean.png';
import './view/imgs/category-asian.png';
import './view/imgs/category-chinese.png';
import './view/imgs/category-japanese.png';
import './view/imgs/category-western.png';
import './view/imgs/category-etc.png';
import './view/imgs/favorite-icon-filled.png';
import './view/imgs/favorite-icon-lined.png';

window.customElements.define('app-gnb', GNB);
window.customElements.define('app-modal', Modal);
window.customElements.define('app-select', Select, { extends: 'select' });
window.customElements.define('app-restaurant-form', RestaurantForm, { extends: 'form' });
window.customElements.define('app-restaurant-item', RestaurantItem, { extends: 'li' });
window.customElements.define('app-restaurant-list', RestaurantList, { extends: 'ul' });
window.customElements.define('app-restaurant-detail', RestaurantDetail);

const controller = new WebController();
controller.start();
