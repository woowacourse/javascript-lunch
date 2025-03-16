describe("바텀시트 동작 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get("#header-icon").click();
  });

  it("상단의 header 오른쪽에 위치한 햄버거 아이콘 클릭 시 바텀시트가 열린다", () => {
    cy.get("#bottom-sheet-open").should("exist");
  });

  it("바텀 시트가 열린 뒤, 하단에 위치한 취소 버튼 클릭 시 바텀시트가 닫힌다", () => {
    cy.get("#cancel-btn").click();
    cy.get("#bottom-sheet-open").should("not.exist");
  });

  it("바텀 시트가 열린 뒤, 바텀시트 외부 영역을 클릭 시 바텀시트가 닫힌다", () => {
    cy.get("#bottom-sheet-overlay").click();
    cy.get("#bottom-sheet-content").should("not.exist");
  });
});
