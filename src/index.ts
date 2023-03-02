import './styles/reset.css';
import './styles/style.css';
import { render } from './utils/core';
import { App } from './view/components/App';

render(App, document.querySelector('#app'));
