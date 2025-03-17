const checkFormLabels = () => {
  const labelNames = [
    "카테고리",
    "이름",
    "거리(도보 이동 시간)",
    "설명",
    "참고 링크",
  ];

  cy.get(".form-item").should("have.length", labelNames.length);

  labelNames.forEach((labelName) => {
    cy.contains("label", labelName).should("exist").and("be.visible");
  });
};

describe("새로운 음식점 추가 플로우 테스트", () => {
  beforeEach(() => {
    cy.initializeTestEnvironment();
  });

  it("음식점 추가 버튼을 누르면 바텀 시트가 열리고, 새로운 음식점 정보를 입력하여 제출 시 목록에 해당 음식점 정보가 추가된다.", () => {
    // given
    cy.openForm();
    checkFormLabels();

    // when
    const formData = {
      category: "한식",
      name: "얌샘 김밥",
      distance: "10",
      description: "맛있는 김밥",
      link: "링크 테스트용 텍스트",
    };
    cy.fillForm(formData);
    cy.clickAddButton();

    // then
    cy.get("#submit-form").should("not.have.class", "modal--open");
    cy.contains("h3", "얌샘 김밥").should("exist").and("be.visible");
    cy.contains("span", "캠퍼스부터 10분 내").should("exist").and("be.visible");
    cy.contains("p", "맛있는 김밥").should("exist").and("be.visible");
  });

  it("음식점 추가 버튼을 누르면 바텀 시트가 열리고, 필수 입력 정보를 입력하지 않을 시 모달창이 닫히지 않고 해당 음식점이 추가가 되지 않는다.", () => {
    // given
    cy.openForm();
    checkFormLabels();

    // when
    const formData = {
      category: "한식",
      name: "얌샘 김밥",
      description: "맛있는 김밥",
    };
    cy.fillForm(formData);
    cy.clickAddButton();

    // then
    cy.get("#submit-form").should("have.class", "modal--open");
    cy.contains("h3", "얌샘 김밥").should("not.exist");
    cy.contains("span", "캠퍼스부터 10분 내").should("not.exist");
    cy.contains("p", "맛있는 김밥").should("not.exist");
  });

  it("음식점이 여러 개 추가되는 경우, 이전 음식점이 목록에서 사라지지 않고 정상적으로 유지된다.", () => {
    // given
    cy.openForm();
    checkFormLabels();

    // when
    const firstFormData = {
      category: "한식",
      name: "얌샘 김밥",
      distance: "10",
      description: "맛있는 김밥",
      link: "링크 테스트용 텍스트",
    };
    cy.fillForm(firstFormData);
    cy.clickAddButton();

    // given
    cy.openForm();
    checkFormLabels();

    // when
    const secondFormData = {
      category: "중식",
      name: "짜장면",
      distance: "15",
      description: "맛있는 짜장면",
      link: "링크 테스트용 텍스트",
    };
    cy.fillForm(secondFormData);
    cy.clickAddButton();

    // then
    cy.get("#submit-form").should("not.have.class", "modal--open");
    cy.contains("h3", "얌샘 김밥").should("exist").and("be.visible");
    cy.contains("h3", "짜장면").should("exist").and("be.visible");
    cy.contains("span", "캠퍼스부터 10분 내").should("exist").and("be.visible");
    cy.contains("span", "캠퍼스부터 15분 내").should("exist").and("be.visible");
    cy.contains("p", "맛있는 김밥").should("exist").and("be.visible");
    cy.contains("p", "맛있는 짜장면").should("exist").and("be.visible");
  });
});
