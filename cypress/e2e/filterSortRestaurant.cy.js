describe("음식점 정렬 및 필터링 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.viewport(1920, 1080);

    cy.get("[name=add]").click();
    cy.get("form [name=category]").select("양식");
    cy.get("form [name=name]").type("B 양식당");
    cy.get("form [name=distance]").select("10");
    cy.get("form [name=description]").type("양식 테스트 설명입니다");
    cy.get("form [name=submit]").click();

    cy.get("[name=add]").click();
    cy.get("form [name=category]").select("한식");
    cy.get("form [name=name]").type("A 한식당");
    cy.get("form [name=distance]").select("5");
    cy.get("form [name=description]").type("한식 테스트 설명입니다");
    cy.get("form [name=submit]").click();
  });
  it("드롭다운에서 양식을 선택할 경우 양식 음식점만 필터링 된다", () => {
    cy.get(".restaurant-filter-container [name=category]").select("양식");

    cy.get(".restaurant").should("have.length", 1);

    cy.get(".restaurant__name").first().should("contain", "B 양식당");
  });
  it("드롭다운에서 거리순을 선택할 경우 거리순으로 정렬된다", () => {
    cy.get("[name=sort]").select("거리순");

    cy.get(".restaurant__name").first().should("contain", "A 한식당");
    cy.get(".restaurant__distance").first().should("contain", "캠퍼스부터 5분 내");

    cy.get(".restaurant__name").eq(1).should("contain", "B 양식당");
    cy.get(".restaurant__distance").eq(1).should("contain", "캠퍼스부터 10분 내");
  });
});
