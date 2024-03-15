// styles
import './components/global.css';

// components
import App from './components/App';
import GNB from './components/GNB/GNB';
import Modal from './components/Modal/Modal';
import Select from './components/Select/Select';
import RestaurantForm from './components/RestaurantForm/RestaurantForm';
import RestaurantList from './components/RestaurantList/RestaurantList';
import RestaurantItem from './components/RestaurantItem/RestaurantItem';
import RestaurantFilters from './components/RestaurantFilters/RestaurantFilters';
import BookmarkTab from './components/BookmarkTab/BookmarkTab';
import CategoryIcon from './components/RestaurantItem/CategoryIcon/CategoryIcon';
import BookmarkButton from './components/RestaurantItem/BookmarkButton/BookmarkButton';
import RestaurantDetail from './components/RestaurantDetail/RestaurantDetail';

window.customElements.define('app-gnb', GNB);
window.customElements.define('app-modal', Modal);
window.customElements.define('app-select', Select, { extends: 'select' });
window.customElements.define('app-restaurant-form', RestaurantForm, { extends: 'form' });
window.customElements.define('app-restaurant-list', RestaurantList, { extends: 'ul' });
window.customElements.define('app-restaurant-item', RestaurantItem, { extends: 'li' });
window.customElements.define('app-category-image', CategoryIcon, { extends: 'img' });
window.customElements.define('app-bookmark-button', BookmarkButton, { extends: 'button' });
window.customElements.define('app-restaurant-detail', RestaurantDetail);
window.customElements.define('app-restaurant-filters', RestaurantFilters);
window.customElements.define('app-bookmark-tab', BookmarkTab);

const app = new App();
app.start();
