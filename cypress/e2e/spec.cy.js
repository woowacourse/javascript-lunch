describe("Test Group", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.viewport(1920, 1080);
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
  it("모달 컴포넌트를 정상적으로 렌더링 한다", () => {
    //then
    cy.get(".modal").should("exist");
  });
  it("음식점 추가 버튼을 클릭했을 때 모달 컴포넌트가 렌더링 된다", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal").should("exist");
  });
  it("모달 배경화면을 클릭했을 때 모달 컴포넌트가 사라진다", () => {
    //then
    cy.get(".gnb__button").click();
    cy.get(".modal-backdrop").click({ force: true });
    cy.get(".modal--open").should("not.exist");
  });
  it("모달창을 열었을 때 SelectInput 컴포넌트가 렌더링 된다. ", () => {
    cy.get(".gnb__button").click();
    cy.get(".form-item select").should("exist").contains("선택해 주세요");
  });
  it("모달창을 열었을 때 Input 컴포넌트가 렌더링 된다.", () => {
    cy.get(".gnb__button").click();
    cy.get(".form-item input").should("exist");
  });
  it("모달창을 열었을 때 TextareaInput 컴포넌트가 렌더링 된다", () => {
    cy.get(".gnb__button").click();
    cy.get(".form-item textarea").should("exist");
  });
  // it("모달창을 열었을 때 제출 버튼이 렌더링 된다", () => {
  //   cy.get(".gnb__button").click();
  //   cy.get(".button-container button").should("exist");
  // });
});
