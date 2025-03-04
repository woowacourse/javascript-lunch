describe("LunchInfoCard 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("초기 LunchInfoCard는 6개가 있다.", () => {
    cy.get(".restaurant-list").children(".restaurant").should("have.length", 6);
  });

  it("LunchInfoCard에는 점심 음식점 이름이 들어있다.", () => {
    cy.get(".restaurant-list")
      .children(".restaurant")
      .eq(0)
      .find(".restaurant__name")
      .should("have.text", "피양콩할마니");
  });

  it("LunchInfoCard에는 캠퍼스에서 음식점까지의 거리가 들어있다.", () => {
    cy.get(".restaurant-list")
      .children(".restaurant")
      .eq(0)
      .find(".restaurant__distance")
      .should("have.text", "캠퍼스부터 10분 내");
  });

  it("LunchInfoCard에는 점심 음식점 설명이 들어있다.", () => {
    cy.get(".restaurant-list")
      .children(".restaurant")
      .eq(0)
      .find(".restaurant__description")
      .should(
        "contain.text",
        "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니."
      );
  });
});
