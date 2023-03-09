import Header from "@/component/main/Header";
import AddModal from "@/component/main/AddModal";
import EveryItemPage from "./component/page/EveryItemPage";
import BookmarkedPage from "./component/page/BookmarkedPage";
import { Constants } from "./constant/Restaurant";
import { $$ } from "./utils/Dom";
import PageChoice from "./component/main/PageChoice";

class App {
  target: HTMLElement;

  constructor(body: HTMLElement) {
    this.target = body;
    this.renderComponents(this.target);
    this.addEvents();
  }

  renderComponents(target: HTMLElement) {
    Header.render(target);
    PageChoice.render(target);
    new EveryItemPage(target);
  }

  addEvents() {
    Header.addEvent(AddModal.openModal);
    PageChoice.addEvent(this.switchPage);
  }

  switchPage = (page: string) => {
    this.deletePage();

    switch (page) {
      case Constants.EVERY_PAGE:
        new EveryItemPage(this.target);
        break;

      case Constants.BOOKMARKED_PAGE:
        new BookmarkedPage(this.target);
        break;
    }
  };

  deletePage = () => {
    $$("section")?.forEach((section) => {
      section.remove();
    });
  };
}

export default App;
