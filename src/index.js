import '../templates/style.css';
import WebController from './Controller/WebController';

import Dropdown from './view/components/Dropdown';

window.customElements.define('drop-down', Dropdown, { extends: 'select' });

new WebController().run();
