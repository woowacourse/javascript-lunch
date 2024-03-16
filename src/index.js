import './resources.ts';

import { $ } from './utils/dom';
import { createAppHeader } from './components/header/AppHeader.js';
import { createRestViewer } from './components/main/RestListMain';

const $app = $('#app');
const $appHeader = createAppHeader();
const $restListMain = createRestViewer();

$app.appendChild($appHeader);
$app.appendChild($restListMain);
