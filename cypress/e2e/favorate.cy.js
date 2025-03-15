describe("레스토랑 아이템 즐겨찾기 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.viewport(1280, 720);

    cy.addRestaurant(
      "한식",
      "한식",
      "15분 내",
      "정갈한 한식",
      "https://koreanfood.com"
    );
    cy.addRestaurant(
      "일식",
      "일식",
      "5분 내",
      "신선한 초밥",
      "https://sushi.com"
    );
    cy.addRestaurant(
      "양식",
      "양식",
      "10분 내",
      "맛있는 파스타",
      "https://italian.com"
    );
  });

  it("음식점 목록에서 특정 아이템의 즐겨찾기 버튼을 누르면 별의 이미지가 변경된다.", () => {
    cy.get(".restaurant-list li").last().find(".favorite__star").click();

    cy.get(".restaurant-list li")
      .last()
      .find(".favorite__star")
      .should("have.attr", "src", "./fill-star.png");
  });

  it("음식점 목록에서 특정 아이템의 즐겨찾기 버튼을 두번 누르면 원래 이미지로 돌아온다.", () => {
    cy.get(".restaurant-list li").last().find(".favorite__star").click();

    cy.get(".restaurant-list li")
      .last()
      .find(".favorite__star")
      .should("have.attr", "src", "./fill-star.png");

    cy.get(".restaurant-list li").last().find(".favorite__star").click();

    cy.get(".restaurant-list li")
      .last()
      .find(".favorite__star")
      .should("have.attr", "src", "./empty-star.png");
  });

  it("자주 가는 음식점 탭을 클릭하면 즐겨찾기한 음식점 목록이 본인다.", () => {
    cy.get(".restaurant-list li").last().find(".favorite__star").click();

    cy.get(".restaurant-list li")
      .last()
      .find(".favorite__star")
      .should("have.attr", "src", "./fill-star.png");

    cy.get("#favorite-Restaurant").click();
    cy.get(".restaurant-list li").should("have.length", 1);
  });
});
