import './css/style.css';
import '../image/add-button.png';
import '../image/category-asian.png';
import '../image/category-chinese.png';
import '../image/category-etc.png';
import '../image/category-western.png';
import '../image/category-korean.png';
import '../image/category-japanese.png';
import App from './App';

const app = new App(document.querySelector('#root'));
app.initRender();
app.addEvents();
