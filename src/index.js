import '../templates/style.css';
import '../templates/button.css';
import '../templates/category.css';
import '../templates/gnb.css';
import '../templates/modal.css';
import '../templates/restaurantList.css';
import '../templates/star.css';
import '../templates/tabBar.css';
import '../templates/typography.css';

import './component/toast/toast.css';
import './images/category-korean.png';
import './images/category-etc.png';
import './images/category-japanese.png';
import './images/category-chinese.png';
import './images/category-asian.png';
import './images/category-western.png';
import './images/add-button.png';
import './images/favorite-icon-filled.png';
import './images/favorite-icon-lined.png';
import { appController } from './web/AppControl';

new appController().setMainPage();
