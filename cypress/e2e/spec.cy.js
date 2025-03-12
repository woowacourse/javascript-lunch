describe("Test Group", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("유효한 값 입력 후 추가하기를 누르면 submit 이벤트를 발생시키고 모달이 닫힌 후, LunchList의 LunchItem에 사용자가 입력한 데이터가 추가된다.", () => {
    cy.get("#openStoreModalBtn").click();

    cy.get("#category").select("korean");
    
    cy.get("#name").type("파양콩 할마니");
    
    cy.get("#distance").select("10");
    
    cy.get("#description").type("맛있는 콩 요리 전문점");
    
    cy.get("#link").type("https://example.com");
    
    cy.get('button[type="submit"]').click();

    cy.get("modal modal--open").should("not.exist");

    cy.get(".restaurant-list")
      .contains("파양콩 할마니")
      .should("be.visible");

    cy.get(".restaurant-list")
      .within(() => {
        cy.contains("10분 내").should("be.visible");
        cy.contains("맛있는 콩 요리 전문점").should("be.visible");
        cy.contains("https://example.com").should("be.visible");
      });
  });
});
