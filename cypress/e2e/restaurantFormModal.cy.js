describe("음식점 관리 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.viewport(1280, 720);
  });

  describe("음식점 목록이 정상적으로 렌더링 되는 경우", () => {
    it("음식점 목록을 확인할 수 있다.", () => {
      cy.get(".restaurant-item").should("have.length.at.least", 1);
    });
  });

  describe("카테고리 필터링을 클릭한 경우", () => {
    it("선택한 카테고리의 음식점만 표시된다.", () => {
      cy.get("#category-filter").select("한식");
      cy.get(".restaurant-item").each(($el) => {
        cy.wrap($el).find(".restaurant-category").should("contain", "한식");
      });
    });
  });
});

  describe("음식점 상세 정보 모달을 여는 경우", () => {
    beforeEach(() => {
      cy.get(".restaurant-item").first().click();
    });

    it("음식점 상세 정보 모달이 열린다.", () => {
      cy.get(".modal").should("be.visible");
    });

    it("음식점 상세 정보를 확인할 수 있다.", () => {
      cy.get(".modal .restaurant-name").should("exist");
      cy.get(".modal .restaurant-category").should("exist");
      cy.get(".modal .restaurant-distance").should("exist");
      cy.get(".modal .restaurant-description").should("exist");
      cy.get(".modal .restaurant-link").should("have.attr", "href");
    });

    it("음식점 삭제 버튼 클릭 시 목록에서 제거된다.", () => {
      cy.get(".modal .delete-button").click();
      cy.get(".modal").should("not.exist");
      cy.get(".restaurant-item").should("have.length.lessThan", 3);
    });

    it("음식점 상세 정보 모달을 닫는다.", () => {
      cy.get(".modal .close-button").click();
      cy.get(".modal").should("not.exist");
    });
  });

  describe("음식점 즐겨찾기(★) 기능을 테스트하는 경우", () => {
    it("음식점 목록에서 즐겨찾기 버튼 클릭 시 추가 및 삭제 가능", () => {
      cy.get(".restaurant-item").first().as("targetRestaurant");

      cy.get("@targetRestaurant").find(".favorite-button").click(); // 즐겨찾기 추가
      cy.get("@targetRestaurant").find(".favorite-button").should("have.class", "active");

      cy.get("@targetRestaurant").find(".favorite-button").click(); // 즐겨찾기 제거
      cy.get("@targetRestaurant").find(".favorite-button").should("not.have.class", "active");
    });

    it("음식점 상세 정보 모달에서 즐겨찾기 추가가 가능한지 확인", () => {
      cy.get(".restaurant-item").first().click();
      cy.get(".modal .favorite-button").click();
      cy.get(".modal .favorite-button").should("have.class", "active");
    });

    it("자주 가는 음식점 탭에서 추가한 음식점이 정상적으로 유지되는지 확인", () => {
      cy.get(".restaurant-item").first().find(".favorite-button").click();
      cy.get(".tab-favorites").click();
      cy.get(".restaurant-item").should("have.length.greaterThan", 0);
    });

    it("새로고침해도 추가한 정보들이 유지된다.", () => {
      cy.get(".restaurant-item").first().find(".favorite-button").click();
      cy.reload();
      cy.get(".tab-favorites").click();
      cy.get(".restaurant-item").should("have.length.greaterThan", 0);
    });
  });
});
