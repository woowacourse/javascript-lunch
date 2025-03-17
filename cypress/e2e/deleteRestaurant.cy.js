const formData = {
  category: "한식",
  name: "얌샘 김밥",
  distance: "10",
  description: "맛있는 김밥",
  link: "링크 테스트용 텍스트",
};

describe("특정 음식점 삭제 플로우 테스트", () => {
  beforeEach(() => {
    cy.initializeTestEnvironment();

    // given
    cy.openForm();
    cy.fillForm(formData);
    cy.clickAddButton();
  });

  it("모든 음식점 목록에서 특정 음식점의 상세 정보 바텀 시트에서 삭제하기 버튼 클릭 시 해당 음식점이 삭제된다.", () => {
    // given
    // when
    // 상세정보 탭을 열기
    cy.get(".restaurant-list .restaurant")
      .should("exist")
      .and("be.visible")
      .first()
      .click();
    cy.get("#open-detail").should("have.class", "modal--open");

    // 해당 음식점 삭제하기
    cy.contains("button", "삭제하기").should("exist").and("be.visible").click();

    // then
    // 모든 음식점 목록에서 볼 수 없음
    cy.get(".restaurant-list .restaurant").should("not.exist");
  });

  it("자주 가는 음식점 목록에서 특정 음식점의 상세 정보 바텀 시트에서 삭제하기 버튼 클릭 시 해당 음식점이 삭제된다.", () => {
    // given
    // 초기에 자주 가는 음식점 추가해두기
    cy.get(".restaurant-list .restaurant .favorite-button")
      .should("exist")
      .and("be.visible")
      .first()
      .click();

    // when
    // 자주 가는 음식점 목록 들어가기
    cy.get(".restaurant-favorite-menu").click();

    // 상세정보 탭을 열기
    cy.get(".restaurant-list .restaurant")
      .should("exist")
      .and("be.visible")
      .first()
      .click();
    cy.get("#open-detail").should("have.class", "modal--open");

    // 해당 음식점 삭제하기
    cy.contains("button", "삭제하기").should("exist").and("be.visible").click();

    // then
    // 모든 음식점 목록에서 볼 수 없음
    cy.get(".restaurant-list .restaurant").should("not.exist");
  });
});
