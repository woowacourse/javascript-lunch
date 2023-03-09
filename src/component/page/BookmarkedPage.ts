import { Constants } from "@/constant/Restaurant";
import Page from "../common/Page";

class BookmarkedPage extends Page {
  constructor(body: Element) {
    super(body, Constants.BOOKMARKED_PAGE);
  }
}

export default BookmarkedPage;
