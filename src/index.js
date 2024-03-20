import './resources.ts';

import { $ } from './utils/dom';
import { AppHeader } from './components/header/AppHeader';
import { RestListMain } from './components/main/RestListMain';
import { AddRestDialog } from './components/dialog/AddRestDialog';
import { Global } from './controllers/Global';

const $app = $('#app');
const $appHeader = AppHeader();
const $restListMain = RestListMain();
const $addRestDialog = AddRestDialog();

/* UI 렌더링 */
$app.appendChild($appHeader);
$app.appendChild($restListMain);
$app.appendChild($addRestDialog);

/* App 초기화 */
document.addEventListener('DOMContentLoaded', () => {
  Global.restListController.render({});
});
