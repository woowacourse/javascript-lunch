/* eslint-disable */

const exampleRestaurants = [
  {
    category: "일식",
    name: "일식집1",
    distance: 30,
    description: "일식집 설명",
    link: "http://naver.com",
  },
  {
    category: "중식",
    name: "중식집1",
    distance: 10,
    description: "중식집설명",
    link: "http://naver.com",
  },
  {
    category: "한식",
    name: "한식집1",
    distance: 5,
    description: "한식집설명",
    link: "http://naver.com",
  },
];

describe("점심 뭐 먹지 E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");

    exampleRestaurants.forEach((exampleRestaurant) => {
      cy.get(".gnb__button").click();
      cy.get("select#category").select(exampleRestaurant.category);
      cy.get("input#name").type(exampleRestaurant.name);
      cy.get("select#distance").select(exampleRestaurant.distance.toString());
      cy.get("textarea#description").type(exampleRestaurant.description);
      cy.get("input#link").type(exampleRestaurant.link);
      cy.get("form.restaurant-form").submit();
    });
  });

  it("추가한 식당 이름와 UI의 식당 이름 일치여부 확인", () => {
    cy.get("h3.restaurant__name").each(($el, index, $list) => {
      const text = $el.text();
      // 텍스트 내용을 비교합니다.
      expect(text).to.eq(exampleRestaurants[index].name);
    });
  });
});
