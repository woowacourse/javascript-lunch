describe("step2 e2e 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");

    cy.get(".gnb__button").click();
    cy.get("#category").select("한식");
    cy.get("#name").type("김찌");
    cy.get("#distance").select("10");
    cy.get("#description").type("맛맛맛있는 김치찌개");
    cy.get("#link").type("https://example.com");
    cy.get(".button--primary").click();
  });

  describe("음식점 클릭 시 모달의 기능", () => {
    beforeEach(() => {
      cy.get(".restaurant-list").children().click();
    });

    it("모달 상세 정보에서 카테고리 아이콘, 이름, 거리, 설명을 확인할 수 있다.", () => {
      cy.get(".restaurant__category").should("exist");
      cy.get(".restaurant__name").should("exist");
      cy.get(".restaurant__description").should("exist");
    });

    it("모달 상세 정보에서 닫기 버튼을 클릭할 시 모달창이 닫힌다.", () => {
      cy.get("#closeModalButton").click();
      cy.get(".modal").should("not.have.class", "modal--open");
    });

    it("모달 상세 정보에서 삭제 버튼을 클릭할 시 모달창이 닫히고 목록에서 삭제된다.", () => {
      cy.get("#deleteRestaurantButton").click();
      cy.get(".modal").should("not.have.class", "modal--open");
    });
  });

  describe("자주가는 음식점 목록의 화면", () => {
    beforeEach(() => {
      cy.get(".restaurant-list")
        .children()
        .first()
        .get(".favorite-icon")
        .click();
    });

    it("음식점 즐겨찾기 클릭 시 자주가는 음식점 목록에 추가된다.", () => {
      cy.get("#favorite")
        .get(".restaurant-list")
        .contains(".restaurant__name", "김찌")
        .should("exist");
    });

    it("음식점 즐겨찾기가 활성화된 상황에서 클릭 시 자주가는 음식점 목록에서 제외된다.", () => {
      cy.get("#favorite")
        .get(".restaurant-list")
        .children()
        .first()
        .get(".favorite-icon")
        .click()
        .contains(".restaurant__name", "김찌")
        .should("not.exist");
    });
  });
});
