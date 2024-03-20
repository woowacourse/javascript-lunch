import { $ } from '../utils/dom';
import DialogController from './DialogController';
import RestListController from './RestListController';

interface IGlobal {
  addRestDialogController: DialogController;
  restListController: RestListController;
}

export const Global: IGlobal = {} as IGlobal;

document.addEventListener('DOMContentLoaded', () => {
  /* addRestDialogController */
  const $addRestDialog = $<HTMLDialogElement>('#add-rest-dialog');
  if (!$addRestDialog) throw new Error('Element not found: #add-rest-dialog');
  Global.addRestDialogController = new DialogController($addRestDialog);

  /* restListController */
  const $restList = $<HTMLUListElement>('.rest-list-section ul');
  if (!$restList) throw new Error('Element not found: .rest-list-section ul');
  Global.restListController = new RestListController($restList);
});
