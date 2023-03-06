import './styles/reset.css';
import './styles/style.css';
import { $ } from './utils/common/domHelper';
import { render } from './utils/core';
import { App } from './view/components/App';

render(App, $('#app'));
