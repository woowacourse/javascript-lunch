import './styles/reset.css';
import './styles/style.css';
import { $ } from './utils/common/domHelper';
import { render } from './utils/core';
import { App } from './view/components/App';
import './assets/add-button.png';
import './assets/category-korean.png';
import './assets/category-chinese.png';
import './assets/category-japanese.png';
import './assets/category-western.png';
import './assets/category-asian.png';
import './assets/category-etc.png';
import './assets/favorite-icon-filled.png';
import './assets/favorite-icon-lined.png';

render(App, $('#app'));
