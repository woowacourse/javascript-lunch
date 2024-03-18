
import './resources.ts';
import './';

import { $ } from './utils/dom';
import { createAppHeader } from './components/header/AppHeader';
import { createRestListMain } from './components/main/RestListMain';
import DialogController from './controllers/DialogController';
import { Global } from './controllers/Global';
import { createAddRestDialog } from './components/dialog/addRestDialog';

export let addRestDialogController;

const $app = $('#app');
const $appHeader = createAppHeader();
const $restListMain = createRestListMain();
const $addRestDialog = createAddRestDialog();

$app.appendChild($appHeader);
$app.appendChild($restListMain);
$app.appendChild($addRestDialog);

/* DOM Load 후 객체 초기화 */
document.addEventListener('DOMContentLoaded', () => {
  Global.addRestDialogController = new DialogController($('#add-rest-dialog'));
});
