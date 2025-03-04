describe("헤더 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("헤더에 '점심 뭐 먹지' 텍스트가 표시되는지 확인한다.", () => {
    cy.get(".text-title").should("contain", "점심 뭐 먹지");
  });
  it("헤더에 모달 버튼이 표시되는지 확인한다.", () => {
    cy.get("#gnb-button").should("exist");
  });

  it("Body에 레스토랑 아이콘이 표시되는지 확인한다.", () => {
    cy.get(".restaurant__category").should("exist");
  });

  it("Body에 레스토랑 title이 표시되는지 확인한다.", () => {
    cy.get(".restaurant__name").should("exist");
  });

  it("Body에 레스토랑 소요시간이 표시되는지 확인한다.", () => {
    cy.get(".restaurant__distance").should("exist");
  });

  it("Body에 레스토랑 설명이 표시되는지 확인한다.", () => {
    cy.get(".restaurant__description").should("exist");
  });
});
