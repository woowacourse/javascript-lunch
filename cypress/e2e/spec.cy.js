describe("Test Group", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("사용자가 음식점 목록 페이지에 접속한다.", () => {
    cy.get(".gnb").should("be.visible");
  });

  it("음식점 목록에서 우측 상단의 추가 버튼을 누른다.", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal-container").should("be.visible");
  });

  it("음식점 정보 리스트를 본다.", () => {
    cy.get(".restaurant-list").should("be.visible");
  });

  it("음식점 정보 아이템을 본다.", () => {
    cy.get(".restaurant").contains("피양콩할마니");
  });
});
