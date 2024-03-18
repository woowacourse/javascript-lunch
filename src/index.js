import './resources.ts';
import './';

import { $ } from './utils/dom';
import { createAppHeader } from './components/header/AppHeader';
import { createRestListMain } from './components/main/RestListMain';
import { createAddRestDialog } from './components/dialog/addRestDialog';

export let addRestDialogController;

const $app = $('#app');
const $appHeader = createAppHeader();
const $restListMain = createRestListMain();
const $addRestDialog = createAddRestDialog();

$app.appendChild($appHeader);
$app.appendChild($restListMain);
$app.appendChild($addRestDialog);
