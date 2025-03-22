describe("음식점 추가 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.viewport(1920, 1080);
    cy.get("[name=add]").click();
  });
  it("음식점 추가 버튼을 누르면 모달창에 음식점 추가 폼이 나타난다", () => {
    cy.get(".modal").should("exist");
  });
  it("폼 내의 '추가' 버튼을 누르면 음식점이 리스트에 추가된다", () => {
    cy.get("form [name=category]").select("한식");
    cy.get("form [name=name]").type("테스트 식당명");
    cy.get("form [name=distance]").select("30");

    cy.get("form [name=submit]").click();

    cy.get(".restaurant-list").should("contain", "테스트 식당명");
  });
});
