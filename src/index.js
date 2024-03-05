import '../templates/style.css';
import './app.ts';
import './components/header/Header.ts';
import './components/FilterContainer.ts';
import './components/ListContainer.ts';
import './components/Modal.ts';

import Matzip from './matzip';
import matzipList from './mock/restaurants';

const matzip = new Matzip(matzipList);
