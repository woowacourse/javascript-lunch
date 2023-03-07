import { mockList } from "../src/data/mockRestaurant";
import { MakeNewList } from "../src/domain/MakeNewList";
describe("필터/정렬이 적용된 레스토랑 리스트 만들기", () => {
  test("필터가 '양식'인 경우 레스토랑 하나만 리턴됨", () => {
    MakeNewList.filterState = "양식";
    expect(MakeNewList.filter(mockList).length).toEqual(2);
  });

  test("필터가 '중식'인 경우 레스토랑 하나만 리턴됨", () => {
    MakeNewList.filterState = "중식";
    expect(MakeNewList.filter(mockList).length).toEqual(2);
  });

  test("정렬이 '거리'인 경우 첫 번째 레스토랑 이름이 '양양양'", () => {
    MakeNewList.sortState = "distance";
    const resultArray = MakeNewList.sort(mockList);
    expect(resultArray[0].name).toEqual("양양양");
  });

  test("필터가 '일식', 정렬이 '거리'인 경우 레스토랑 하나만 리턴됨", () => {
    MakeNewList.filterState = "일식";
    MakeNewList.sortState = "distance";
    const resultArray = MakeNewList.getNewList(mockList);
    expect(resultArray[0].name).toEqual("잇쇼우");
  });

  test("필터가 '아시안', 정렬이 '이름'인 경우 레스토랑 하나만 리턴됨", () => {
    MakeNewList.filterState = "아시안";
    MakeNewList.sortState = "distance";
    MakeNewList.sortState = "name";
    const resultArray = MakeNewList.getNewList(mockList);
    expect(resultArray[0].name).toEqual("아시안");
  });
});
