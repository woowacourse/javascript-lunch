import './css/index.css';
import App from './App';
import '../image/add-button.png';
import '../image/category-asian.png';
import '../image/category-chinese.png';
import '../image/category-etc.png';
import '../image/category-western.png';
import '../image/category-korean.png';
import '../image/category-japanese.png';
import '../image/favorite-icon-filled.png';
import '../image/favorite-icon-lined.png';

const fragment = document.createDocumentFragment();
new App({ $parent: fragment }).render();

document.getElementById('root').append(fragment);
