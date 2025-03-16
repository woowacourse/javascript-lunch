import Header from "../components/Header.js";
import { HEADER_CONTENTS } from "../constants/listData.ts";

function createHeaderView() {
  return Header(HEADER_CONTENTS);
}
export default createHeaderView;
