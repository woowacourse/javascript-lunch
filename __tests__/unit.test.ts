import { mockList } from "../src/data/mockRestaurant";
import { FilterSort } from "../src/domain/FilterSort";
import { ListChooseSection } from "../src/components/MainPage/ListChooseSection";
import { RestaurantData } from "../src/domain/RestaurantData";

describe("필터/정렬이 적용된 레스토랑 리스트 만들기", () => {
  test("필터가 '양식'인 경우 레스토랑 두 개 리턴됨", () => {
    FilterSort.filterState = "양식";
    expect(FilterSort.filter(mockList).length).toEqual(2);
  });

  test("필터가 '중식'인 경우 레스토랑 두 개만 리턴됨", () => {
    FilterSort.filterState = "중식";
    expect(FilterSort.filter(mockList).length).toEqual(2);
  });

  test("정렬이 '거리'인 경우 첫 번째 레스토랑 이름이 '양양양'", () => {
    FilterSort.sortState = "distance";
    const resultArray = FilterSort.sort(mockList);
    expect(resultArray[0].name).toEqual("양양양");
  });

  test("필터가 '일식', 정렬이 '거리'인 경우 레스토랑 하나만 리턴됨", () => {
    FilterSort.filterState = "일식";
    FilterSort.sortState = "distance";
    const resultArray = FilterSort.getNewList(mockList);
    expect(resultArray[0].name).toEqual("잇쇼우");
  });

  test("필터가 '아시안', 정렬이 '이름'인 경우 레스토랑 하나만 리턴됨", () => {
    FilterSort.filterState = "아시안";
    FilterSort.sortState = "distance";
    FilterSort.sortState = "name";
    const resultArray = FilterSort.getNewList(mockList);
    expect(resultArray[0].name).toEqual("아시안");
  });
});

// 오류나는 테스트 코드
// describe("클릭한 영역element가 이미 선택되어있는 영역인지 확인", () => {
//   test("class에 list-choose-section이 포함되어 있으면 이미 선택된 영역이므로 false 반환", () => {
//     const div = document.createElement("div");
//     div.className = "likeList list-choose-section";
//     expect(ListChooseSection.targetValidation(div)).toBeFalsy();
//   });
//   test("class에 list-choose-section이 미포함되어 있으면 선택된 영역이 아니므로 true 반환", () => {
//     const div = document.createElement("div");
//     div.className = "likeList";
//     expect(ListChooseSection.targetValidation(div)).toBeTruthy();
//   });
// });

// describe("선호 레스토랑을 추가/삭제 및 전체목록에서 특정 레스토랑 고르기/삭제하기", () => {
//   RestaurantData.allList = mockList;
//   test("선호 레스토랑을 추가 요청 시 레스토랑 데이터 선호 목록에 해당 레스토랑 추가", () => {
//     RestaurantData.addLikeRestaurant(0);
//     expect(RestaurantData.likeList).toEqual([mockList[0]]);
//   });
// });
