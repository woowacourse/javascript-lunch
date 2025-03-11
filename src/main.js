// 만약 모든 리스트가 없을 경우도 처리하기
// 테스트 코드
// 리팩토링 포인트 고민

import { LunchList } from "./components/LunchList.js";
import SubmitEvent from "./utils/SubmitEvent.js";
import { getHTML } from "./utils/utils.js";

const lunchList = LunchList("restaurantListSection");

lunchList.render();
SubmitEvent(lunchList);
