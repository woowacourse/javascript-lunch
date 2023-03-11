beforeEach(() => {
  cy.visit("http://localhost:8080/");
  cy.viewport(500, 850);
});

describe("lunch e2e test", () => {
  it("식당 정보를 입력하면 목록에 추가된다", () => {
    restaurantList(
      "한식",
      "피양콩할마니",
      "10",
      "맛집입니다.",
      "https://naver.me/G6DyD9tg"
    );

    cy.contains("피양콩할마니");
  });

  it("레스토랑을 삭제하면 목록에서 사라진다.", () => {
    restaurantList(
      "한식",
      "피양콩할마니",
      "10",
      "맛집입니다.",
      "https://naver.me/G6DyD9tg"
    );

    cy.contains("피양콩할마니").click();
    cy.get(".item-sheet--delete").click();
    cy.contains("피양콩할마니").should("not.exist");
  });

  it("북마크 버튼을 누르면 북마크 페이지로 식당을 확인할 수 있다.", () => {
    restaurantList(
      "한식",
      "피양콩할마니",
      "10",
      "맛집입니다.",
      "https://naver.me/G6DyD9tg"
    );

    cy.get(".restaurant__bookmark").click();
    cy.get(".bookmark-page").click();
    cy.contains("피양콩할마니");
  });

  it("식당을 카테고리별로 정렬한다", () => {
    restaurantList(
      "한식",
      "피양콩할마니",
      "10",
      "맛집입니다.",
      "https://naver.me/G6DyD9tg"
    );
    restaurantList(
      "일식",
      "일일일",
      "15",
      "이 집의 역사를 느낄 수 있는 특별한 메뉴다.",
      "https://naver.me/G6DyD9tg"
    );

    cy.get("#category-filter").select("한식");
    cy.contains("피양콩할마니");
  });
});

function restaurantList(category, name, distance, description, link) {
  cy.get(".gnb__button").click();
  cy.get("#category").select(category);
  cy.get("#name").type(name);
  cy.get("#takingTime").select(distance);
  cy.get("#description").type(description);
  cy.get("#link").type(link);
  cy.contains("추가하기").click();
}
