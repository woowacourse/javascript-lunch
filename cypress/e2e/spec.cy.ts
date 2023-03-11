describe("점심뭐먹지 미션 e2e 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("음식점 추가 후 추가된 음식점 리스트 렌더링", () => {
    cy.get(".gnb__button").click();
    cy.get("select#category").select("한식");
    cy.get("input#name").type("룩소식당");
    cy.get("select#distance").select("5");
    cy.get(".button--primary").click();

    cy.get("section.restaurant-list-container").children().should("contain.text", "룩소식당");
  });

  it("리스트에서 음식점을 클릭할 경우 상세정보 모달 오픈", () => {
    cy.get(".gnb__button").click();
    cy.get("select#category").select("한식");
    cy.get("input#name").type("룩소식당");
    cy.get("select#distance").select("5");
    cy.get(".button--primary").click();

    cy.get(".restaurant").click();

    cy.get(".modal").should("have.class", "modal--open");
  });

  it("자주 찾는 음식점 탭을 선택 하면 즐겨찾기 한 음식점만 렌더링", () => {
    cy.get(".gnb__button").click();
    cy.get("select#category").select("한식");
    cy.get("input#name").type("룩소식당");
    cy.get("select#distance").select("5");
    cy.get(".button--primary").click();

    cy.get(".favorite").click();

    cy.get(".favorite-tab").click();

    cy.get("section.restaurant-list-container").children().should("contain.text", "룩소식당");
  });
});
