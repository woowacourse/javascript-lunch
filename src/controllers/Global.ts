import DialogController from './DialogController';

interface IGlobal {
  addRestDialogController: DialogController | undefined;
}

export const Global: IGlobal = {
  addRestDialogController: undefined
};
