import { Constants } from "@/constant/Restaurant";
import Page from "./Page";

class BookmarkedPage extends Page {
  constructor(body: Element) {
    super(body, Constants.BOOKMARKED_PAGE);
  }
}

export default BookmarkedPage;
