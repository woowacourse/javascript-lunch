describe("음식점 삭제 테스트", () => {
  it("음식점 삭제 버튼을 클릭하면 리스트에서 음식점이 사라진다", () => {
    cy.visit("http://localhost:5173/");
    cy.viewport(1920, 1080);
    cy.get("[name=add]").click();

    cy.get("form [name=category]").select("한식");
    cy.get("form [name=name]").type("삭제 테스트 음식점");
    cy.get("form [name=distance]").select("5");
    cy.get("form [name=description]").type("삭제 테스트 설명입니다");
    cy.get("form [name=submit]").click();

    cy.get(".restaurant").first().click();

    cy.get("[name=delete]").click();

    cy.on("window:confirm", () => true);
    cy.contains(".restaurant").should("not.exist");
  });
});
