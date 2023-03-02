import '../templates/style.css';
import Header from './components/Header.js';
import Main from './components/Main.js';
import AddModal from './components/AddModal.js';
import { $ } from './utils/domHelpers';

const header = new Header();
const main = new Main();
const addModal = new AddModal();

$('.gnb').innerHTML = header.render();
$('.restaurant-list').innerHTML = main.render();
$('.').innerHTML = addModal.render();
