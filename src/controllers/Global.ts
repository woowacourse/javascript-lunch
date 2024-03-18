import { $ } from '../utils/dom';
import DialogController from './DialogController';

interface IGlobal {
  addRestDialogController: DialogController;
}

export const Global: Partial<IGlobal> = {};

document.addEventListener('DOMContentLoaded', () => {
  const $addRestDialog = $<HTMLDialogElement>('#add-rest-dialog');
  if (!$addRestDialog) throw new Error('Element not found: #add-rest-dialog');
  Global.addRestDialogController = new DialogController($addRestDialog);
});
