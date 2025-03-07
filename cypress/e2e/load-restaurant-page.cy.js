describe("음식점 목록 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("헤더가 정상적으로 로드 되어야 한다.", () => {
    cy.get("header").should("be.visible");
  });

  it("음식점 목록이 정상적으로 로드 되어야 한다.", () => {
    const names = ["피양콩할마니", "친친", "잇쇼우"];
    const items = Array.from(cy.get(".restaurant-list").children());

    items.forEach((item, index) => {
      item.should("contain.text", names[index]);
    });
  });
});
