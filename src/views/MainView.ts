import { $ } from "../utils/domSelectors";

class MainView {
  private addButtton = $(".gnb__button");
  private modal = $(".modal");

  constructor() {
    this.addButtton?.addEventListener("click", (event) => {
      this.modal?.classList.add("modal--open");
    });
  }
}

export default MainView;
