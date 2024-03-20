import './resources.ts';
import './';

import { $ } from './utils/dom';
import { AppHeader } from './components/header/AppHeader';
import { RestListMain } from './components/main/RestListMain';
import { AddRestDialog } from './components/dialog/AddRestDialog';

export let addRestDialogController;

const $app = $('#app');
const $appHeader = AppHeader();
const $restListMain = RestListMain();
const $addRestDialog = AddRestDialog();

$app.appendChild($appHeader);
$app.appendChild($restListMain);
$app.appendChild($addRestDialog);
