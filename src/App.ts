import Header from "@/component/main/Header";
import AddModal from "@/component/main/AddModal";
import { Page } from "./type/type";
import EveryItemPage from "./component/page/EveryItemPage";
import BookmarkedPage from "./component/page/BookmarkedPage";
import { Constants } from "./constant/Restaurant";

class App {
  currentPage: Page;

  constructor(body: Element) {
    this.currentPage = "every";
    this.renderComponents(body);
    this.addEvents();
  }

  renderComponents(body: Element) {
    Header.render(body);

    if (this.currentPage === "every") {
      new EveryItemPage(body);
      return;
    }
    new BookmarkedPage(body);
  }

  addEvents() {
    Header.addEvent(AddModal.openModal);
  }
}

export default App;
