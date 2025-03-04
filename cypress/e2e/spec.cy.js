describe("Test Group", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("헤더 컴포넌트를 정상적으로 렌더링 한다", () => {
    //given
    //when
    //then
    cy.get(".gnb__title").should("exist");
    cy.get(".gnb__title").contains("점심 뭐 먹지");
  });
  it("아이콘 버튼 컴포넌트를 정상적으로 렌더링 한다", () => {
    //given
    //when
    //then
    cy.get(".gnb__button").should("exist").and("be.visible");
    cy.get(".gnb__button img").should("exist").and("be.visible");
  });
  it("FoodItem 컴포넌트를 정상적으로 렌더링 한다", () => {
    //given
    //when
    //then
    cy.get(".restaurant").should("exist").and("be.visible");
    cy.get(".restaurant__category").should("exist").and("be.visible");
    cy.get(".restaurant__info").should("exist").and("be.visible");
    cy.get(".restaurant__distance").should("exist").and("be.visible");
    cy.get(".restaurant__description").should("exist").and("be.visible");
  });
  it("FoodList 컴포넌트를 정상적으로 렌더링 한다", () => {
    //given
    //when
    //then
    cy.get(".restaurant-list li").should("exist").and("be.visible");
  });
});
