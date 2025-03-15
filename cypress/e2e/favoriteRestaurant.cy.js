describe("즐겨찾기 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.viewport(1920, 1080);
    cy.get("[name=add]").click();

    cy.get("form [name=category]").select("한식");
    cy.get("form [name=name]").type("테스트 음식점");
    cy.get("form [name=distance]").select("5");
    cy.get("form [name=description]").type("테스트 설명입니다");
    cy.get("form [name=submit]").click();
  });
  it("즐겨찾기 버튼을 클릭하면 채워진 아이콘으로 변경된다", () => {
    cy.get(".favorite-icon").first().should("have.attr", "src", "/favorite-icon-lined.png");
    cy.get(".favorite-icon").first().click();
    cy.get(".favorite-icon").first().should("have.attr", "src", "/favorite-icon-filled.png");
  });
  it("즐겨찾기 버튼을 클릭하면 자주 가는 음식점에 추가된다", () => {
    cy.get(".restaurant__name").first().invoke("text").as("restaurantName");
    cy.get(".favorite-icon").first().click();
    cy.contains("자주 가는 음식점").click();

    cy.get("@restaurantName").then((name) => {
      cy.get(".restaurant__name").first().should("contain", name);
    });
  });
});
