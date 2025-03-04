describe("Modal 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("아이콘 버튼을 클릭하면 모달이 열린다", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal").should("have.css", "display", "block");
  });
});
