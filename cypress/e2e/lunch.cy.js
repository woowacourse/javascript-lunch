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
