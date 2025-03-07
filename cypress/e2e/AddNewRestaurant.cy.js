describe("새로운 음식점 추가 플로우 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5174/");
    cy.viewport(1536, 960);
  });

  const openFormAndCheckLabels = () => {
    cy.get(".gnb__button").click();
    cy.get(".form-item").should("have.length", 5);

    cy.contains("label", "카테고리").should("exist").and("be.visible");
    cy.contains("label", "이름").should("exist").and("be.visible");
    cy.contains("label", "거리(도보 이동 시간)")
      .should("exist")
      .and("be.visible");
    cy.contains("label", "설명").should("exist").and("be.visible");
    cy.contains("label", "참고 링크").should("exist").and("be.visible");
  };

  it("음식점 추가 버튼을 누르면 바텀 시트가 열리고, 새로운 음식점 정보를 입력하여 제출 시 목록에 해당 음식점 정보가 추가된다.", () => {
    openFormAndCheckLabels();

    const category = "한식";
    cy.get('select[name="category"]')
      .should("be.visible")
      .select(category)
      .should("have.value", category);

    cy.get('input[name="name"]')
      .should("be.visible")
      .type("얌생 김밥")
      .should("have.value", "얌생 김밥");

    cy.get('select[name="distance"]')
      .should("be.visible")
      .select("10분 내")
      .should("have.value", "10");

    cy.get('textarea[name="description"]')
      .should("be.visible")
      .type("설명 테스트용 텍스트")
      .should("have.value", "설명 테스트용 텍스트");

    cy.get('input[name="link"]')
      .should("be.visible")
      .type("링크 테스트용 텍스트")
      .should("have.value", "링크 테스트용 텍스트");

    cy.contains("button", "추가하기").should("exist").and("be.visible").click();
    cy.get(".modal").should("not.have.class", "modal--open");

    cy.contains("h3", "얌생 김밥").should("exist").and("be.visible");
    cy.contains("span", "캠퍼스부터 10분 내").should("exist").and("be.visible");
    cy.contains("p", "설명 테스트용 텍스트").should("exist").and("be.visible");
  });

  it("음식점 추가 버튼을 누르면 바텀 시트가 열리고, 필수 입력 정보를 입력하지 않을 시 모달창이 닫히지 않고 해당 음식점이 추가가 되지 않는다.", () => {
    openFormAndCheckLabels();

    const category = "한식";
    cy.get('select[name="category"]')
      .should("be.visible")
      .select(category)
      .should("have.value", category);

    cy.get('input[name="name"]')
      .should("be.visible")
      .type("얌생 김밥")
      .should("have.value", "얌생 김밥");

    cy.get('textarea[name="description"]')
      .should("be.visible")
      .type("설명 테스트용 텍스트")
      .should("have.value", "설명 테스트용 텍스트");

    cy.contains("button", "추가하기").should("exist").and("be.visible").click();
    cy.get(".modal").should("have.class", "modal--open");

    cy.contains("h3", "얌생 김밥").should("not.exist");
    cy.contains("span", "캠퍼스부터 10분 내").should("not.exist");
    cy.contains("p", "설명 테스트용 텍스트").should("not.exist");
  });
});
