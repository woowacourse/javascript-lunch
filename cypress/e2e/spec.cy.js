describe("헤더 테스트", () => {
  it("헤더에 '점심 뭐 먹지' 텍스트가 표시되는지 확인한다.", () => {
    cy.visit("http://localhost:5173/");

    cy.get(".text-title").should("contain", "점심 뭐 먹지");
  });
  it("헤더에 모달 버튼이 표시되는지 확인한다.", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#gnb-button").should("exist");
  });
});
