describe("헤더 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("헤더가 상단에 보인다", () => {
    cy.get(".gnb").should("be.visible");
    expect(true).to.be.true;
  });

  it("헤더 안에 점심 뭐 먹지라는 텍스트가 보인다", () => {
    cy.get(".gnb").children(".gnb__title").should("exist");
    cy.get(".gnb__title").should("have.text", "점심 뭐 먹지");
    expect(true).to.be.true;
  });

  it("헤더 안에 아이콘이 버튼이 보인다", () => {
    cy.get(".gnb").children(".gnb__button").should("exist");
    expect(true).to.be.true;
  });
});
