describe("상단 navigation 버튼 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("상단 navigation 버튼을 누르면 해당하는 버튼의 텍스트가 강조된다.", () => {
    cy.get(".favorite_restaurant_nav")
      .click()
      .should("have.class", "activated");
  });
});
