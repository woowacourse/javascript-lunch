import './resources.ts';

import { createAppHeader } from './components/container/AppHeader.ts';
import { $ } from './utils/dom';

const $app = $('#app');
const $appHeader = createAppHeader();

$app.appendChild($appHeader);
