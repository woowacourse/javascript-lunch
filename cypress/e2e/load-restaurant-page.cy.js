describe("음식점 목록 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("헤더가 정상적으로 로드 되어야 한다.", () => {
    cy.get("header").should("be.visible");
  });

  it("탭이 정상적으로 로드 되어야 한다.", () => {
    cy.get("nav").should("be.visible");
  });

  describe("음식점 목록이 정상적으로 로드 되어야 한다.", () => {
    it("모든 음식점 탭 클릭시 모든 음식점 목록이 나와야한다(필터링이 모두 전체일떄)", () => {
      const names = [
        "피양콩할마니",
        "친친",
        "잇쇼우",
        "짜짜루루",
        "상화마라탕",
      ];
      const items = Array.from(cy.get(".restaurant-list").children());

      items.forEach((item, index) => {
        item.should("contain.text", names[index]);
      });
    });

    it("자주가는 음식점 탭 클릭시 즐겨찾기 된 음식점 목록이 나와야한다", () => {
      cy.get(".tab__item--favorites").click();
      cy.get(".restaurant-list")
        .children()
        .should("contain.text", "피양콩할마니");
    });
  });

  describe("정렬 기준으로 올바른 정렬이 되어야 한다", () => {
    it("카테고리를 중식으로 설정시 중식 카테고리만 나와야한다", () => {
      cy.get("#category-sorting").select("중식");
      cy.get(".restaurant-list")
        .children()
        .should("contain.text", "친친")
        .should("contain.text", "짜짜루루")
        .should("contain.text", "상화마라탕");
    });
  });
  it("이름순 정렬을 했을때 이름순으로 정렬되어야 한다", () => {
    cy.get("#sorting").select("이름순");
    cy.get(".restaurant-list")
      .children()
      .should("contain.text", "상화마라탕")
      .should("contain.text", "짜짜루루")
      .should("contain.text", "친친");
  });
  it("거리순 정렬을 했을때 거리순으로 정렬되어야 한다", () => {
    cy.get("#sorting").select("거리순");
    cy.get(".restaurant-list")
      .children()
      .should("contain.text", "상화마라탕")
      .should("contain.text", "피양콩할마니")
      .should("contain.text", "친친");
  });
});
