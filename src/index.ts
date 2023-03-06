import './css/index.css';
import '../image/add-button.png';
import '../image/category-asian.png';
import '../image/category-chinese.png';
import '../image/category-etc.png';
import '../image/category-western.png';
import '../image/category-korean.png';
import '../image/category-japanese.png';
import App from './components/App';

const fragment = document.createDocumentFragment();

new App(fragment, {});
document.getElementById('root')?.append(fragment);
