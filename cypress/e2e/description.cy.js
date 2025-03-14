describe("description 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("피양콩할마니를 클릭하면 정상적인 설명을 보여줘야 한다.", () => {
    cy.get("#피양콩할마니").click();

    cy.get(".description-modal").contains("피양콩할마니");
    cy.get(".restaurant__distance").contains("캠퍼스부터 10분 내");
    cy.get(".link").contains("https://pi-yangkonghalmani.com");
    cy.get(".restaurant-description").contains(
      "2005년, 장모님께 전수받은 전통 설렁탕 조리법을 현대적인 감각으로 재해석한 곳. 깊고 진한 국물 맛이 일품입니다."
    );
  });
});
