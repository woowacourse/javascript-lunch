describe("음식점 목록 필터링 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("초기 상태에서 음식점을 추가하지 않고 전체 탭에서 한식 필터를 누르면 피양콩할마니만 보여야 한다", () => {
    cy.get('[data-testid="all-tab"]').click();

    cy.get('[data-testid="category-filter"]').select("한식");

    cy.contains("피양콩할마니").should("be.visible");

    cy.get(".restaurant-list")
      .should("have.length", 1)
      .and("contain", "피양콩할마니");
  });
});

describe("음식점 추가 후 필터링 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");

    cy.get('[data-testid="open-add-restaurant-modal-button"]').click();
    cy.get('[data-testid="modal"]').should("exist");
    cy.get('[data-testid="category"]').select("한식");
    cy.get('[data-testid="restaurant-name"]').type("얌샘김밥");
    cy.get('[data-testid="distance"]').select("5");
    cy.get('[data-testid="description"]').type("맛있는 김밥입니다");
    cy.get('[data-testid="link"]').type("https://www.google.com");

    cy.get('[data-testid="add-restaurant-form"]').submit();

    cy.get('[data-testid="modal"]').should("not.exist");
  });

  it("한식 필터링 선택 시 얌샘김밥이 추가되어 있어야 한다.", () => {
    cy.get('[data-testid="restaurant-list"').and("contain", "얌샘김밥");
  });

  it("한식 필터링 선택 및 거리순 정렬 선택시 얌샘김밥이 첫번째가 되어 있어야 한다.", () => {
    cy.get('[data-testid="category-filter"]').select("한식");
    cy.get('[data-testid="sorting-filter"]').select("거리순");

    cy.get(".restaurant-list").first().should("contain", "얌샘김밥");
  });

  it("얌샘김밥 추가 후 꺼벙이 분식을 추가하면, 한식 필터링 선택 및 이름순 정렬 선택시 얌샘김밥이 두번째가 되어야 한다.", () => {
    cy.get('[data-testid="category-filter"]').select("한식");
    cy.get('[data-testid="sorting-filter"]').select("이름순");

    cy.get('[data-testid="open-add-restaurant-modal-button"]').click();
    cy.get('[data-testid="modal"]').should("exist");
    cy.get('[data-testid="category"]').select("한식");
    cy.get('[data-testid="restaurant-name"]').type("꺼벙이분식");
    cy.get('[data-testid="distance"]').select("20");
    cy.get('[data-testid="description"]').type("맛있는 꺼벙이분식입니다");
    cy.get('[data-testid="link"]').type("https://www.google.com");

    cy.get('[data-testid="add-restaurant-form"]').submit();

    cy.get('[data-testid="modal"]').should("not.exist");

    cy.get(".restaurant-list").children().eq(1).should("contain", "얌샘김밥");
  });
});
