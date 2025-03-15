describe("레스토랑 아이템 상세 모달 e2e 테스트", () => {
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

  it("음식점 목록에서 특정 모달을 클릭하면 상세보기 모달창이 열리고 상세 데이터가 보인다.", () => {
    cy.get(".restaurant-list li").last().click();
    cy.get(".restaurantDetail__modal").should("be.visible");

    cy.get(".restaurantDetail__modal").contains("https://koreanfood.com");
  });

  it("상세보기 모달에서 닫기 버튼을 누르면 모달창이 닫힌다.", () => {
    cy.get(".restaurant-list li").last().click();
    cy.get(".restaurantDetail__modal").should("be.visible");

    cy.get(".restaurantDetail_close").click();
    cy.get(".restaurantDetail__modal").should("not.exist");
  });

  it("상세보기 모달에서 삭제 버튼을 누르면 음식점 데이터가 삭제된다.", () => {
    cy.get(".restaurant-list li").last().click();
    cy.get(".restaurantDetail__modal").should("be.visible");

    cy.get(".restaurantDetail__modal").contains("https://koreanfood.com");
    cy.get(".restaurantDetail_delete").click();

    cy.get(".restaurant-list li").should("have.length", 2);
    cy.get(".restaurant-list li").should("not.contain", "한식");
  });
});
