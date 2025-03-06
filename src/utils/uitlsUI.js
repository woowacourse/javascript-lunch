import querySelector from "./querySelector";

export const modal = {
  addChild: (child) => {
    console.log(querySelector.modalForm());
    querySelector.modalForm().appendChild(child);
  },
};
