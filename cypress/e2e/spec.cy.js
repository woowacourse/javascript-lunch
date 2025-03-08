describe("Test Group", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("헤더 아이콘 클릭 시 바텀시트가 열린다.", () => {
    cy.get("#header-icon").click();

    cy.get("#bottom-sheet").within(() => {
      cy.get("#bottom-sheet-open").should("exist");
    });
  });

  it("바텀시트의 취소 버튼을 누르면 바텀시트가 닫힌다.", () => {
    cy.get("#header-icon").click();

    cy.get("#bottom-sheet").within(() => {
      cy.get("#bottom-sheet-open").should("exist");
    });

    cy.get("#cancel-btn").click();
    cy.get("#bottom-sheet").within(() => {
      cy.get("#bottom-sheet-open").should("not.exist");
    });
  });

  it("유효한 값 입력 후 추가하기를 누르면 submit 이벤트를 발생시키고 모달이 닫힌 후, LunchList의 LunchItem에 사용자가 입력한 데이터가 추가된다.", () => {
    cy.get("#header-icon").click();

    cy.get("#category-select-button").click();
    cy.get("#category-select-dropdown li").contains("한식").click();

    cy.get("#store-name-textarea")
      .type("피양콩할마니")
      .should("have.value", "피양콩할마니");

    cy.get("#location-select-button").click();
    cy.get("#location-select-dropdown li").contains("5분").click();

    cy.get("#reference-textarea")
      .type("https://www.woowacourse.com")
      .should("have.value", "https://www.woowacourse.com");

    cy.get("#description-textarea")
      .type(
        "2005년 장모님에게 전수받은 설렁탕 조리법을 개선하여 시작했다는 외고..."
      )
      .should(
        "have.value",
        "2005년 장모님에게 전수받은 설렁탕 조리법을 개선하여 시작했다는 외고..."
      );

    cy.get("#submit-btn").click();

    cy.get("#bottom-sheet").within(() => {
      cy.get("#bottom-sheet-open").should("not.exist");
    });

    cy.get("#restaurant-list").within(() => {
      cy.get("#lunch-item").should("have.length", 1);

      cy.get("#lunch-item").contains("피양콩할마니").should("exist");
      cy.get("#lunch-item").contains("5분").should("exist");

      cy.get("#lunch-item")
        .contains(
          "2005년 장모님에게 전수받은 설렁탕 조리법을 개선하여 시작했다는 외고..."
        )
        .should("exist");
    });
  });
});
