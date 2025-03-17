describe("음식점 CRUD 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("유효한 값을 입력 후 하단에 위치한 저장하기 버튼을 누르면 음식점 목록에 아이템이 추가된다.", () => {
    cy.get("#header-icon").click();
    cy.get("#store-name-textarea").type("피양콩할마니");
    cy.get("#distance-select-button").click();
    cy.get("#distance-select-dropdown li").contains("5분").click();
    cy.get("#category-select-button").click();
    cy.get("#category-select-dropdown li").contains("한식").click();
    cy.get("#link-textarea").type("https://www.woowacourse.com");
    cy.get("#description-textarea").type("설렁탕 전문점");

    cy.get("#submit-btn").click();
    cy.get("#bottom-sheet-open").should("not.exist");

    cy.get("#restaurant-list").within(() => {
      cy.get("#lunch-item-3").should("exist");
      cy.get("#lunch-item-3").contains("피양콩할마니").should("exist");
      cy.get("#lunch-item-3").contains("5분").should("exist");
      cy.get("#lunch-item-3").contains("설렁탕 전문점").should("exist");
    });
  });

  it("목록에 위치한 음식점의 오른쪽 상단에 위치한 아이콘을 클릭하면 즐겨찾기 아이콘이 변경되며 즐겨찾기 음식점에 추가된다.", () => {
    cy.get("#lunch-item-2").should("exist");
    cy.get('#favorite-button[data-id="2"]').click();
    cy.get(`#favorite-button[data-id="2"] img`).should(
      "have.attr",
      "src",
      "/favorite-icon-filled.png"
    );

    cy.get('#tab-button[data-index="1"]').click();

    cy.get("#restaurant-list").within(() => {
      cy.get("#lunch-item-2").should("exist");
    });
  });

  it("음식점 목록에 존재하는 아이템을 클릭하면 바텀 시트가 열리며 해당 아이템을 상세조회가 가능하다.", () => {
    cy.get("#lunch-item-1").click();
    cy.get("#bottom-sheet-open").should("exist");

    cy.get("#store-name-detail-item").contains("한식당").should("exist");
    cy.get("#distance-detail-item").contains("캠퍼스 내 5분").should("exist");
    cy.get("#description-detail-item")
      .contains("맛있는 한식당")
      .should("exist");
    cy.get("#link-detail-item")
      .contains("https://www.google.com")
      .should("exist");
  });

  it("아이템 상세 조회 시, 하단에 위치한 삭제하기 버튼을 클릭하면 바텀시트가 닫히며 LunchList에서 해당 아이템이 삭제된다.", () => {
    cy.get("#lunch-item-1").click();
    cy.get("#delete-btn").click();
    cy.get("#bottom-sheet-open").should("not.exist");

    cy.get("#restaurant-list").within(() => {
      cy.get("#lunch-item-1").should("not.exist");
    });
  });
});
