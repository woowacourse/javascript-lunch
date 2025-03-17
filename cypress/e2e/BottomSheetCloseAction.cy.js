describe("음식점 추가 바텀 시트 닫는 기능 테스트", () => {
  beforeEach(() => {
    cy.initializeTestEnvironment();
  });

  it("음식점 추가 바텀 시트의 '취소하기' 버튼을 클릭했을 때 바텀 시트가 닫힌다.", () => {
    // when
    cy.openForm();
    cy.contains("button", "취소하기").should("exist").and("be.visible").click();

    // then
    cy.isSubmitModalClose();
  });

  it("음식점 추가 바텀 시트의 백드롭 화면을 클릭했을 때 바텀 시트가 닫힌다.", () => {
    // when
    cy.openForm();
    cy.get("#submit-form .modal-backdrop").click({ force: true });

    // then
    cy.isSubmitModalClose();
  });
});

const formData = {
  category: "한식",
  name: "얌샘 김밥",
  distance: "10",
  description: "맛있는 김밥",
  link: "링크 테스트용 텍스트",
};

describe("음식점 상세 정보 바텀 시트 닫는 기능 테스트", () => {
  beforeEach(() => {
    cy.initializeTestEnvironment();
  });

  it("음식점 상세 정보 바텀 시트의 '닫기' 버튼을 클릭했을 때 바텀 시트가 닫힌다.", () => {
    // when
    cy.openForm();
    cy.fillForm(formData);
    cy.clickAddButton();

    cy.openDetailModal();
    cy.clickCloseButton();

    // then
    cy.isDetailModalClose();
  });

  it("음식점 상세 정보 바텀 시트의 백드롭 화면을 클릭했을 때 바텀 시트가 닫힌다.", () => {
    // when
    cy.openForm();
    cy.fillForm(formData);
    cy.clickAddButton();

    cy.openDetailModal();
    cy.get("#open-detail .modal-backdrop").click({ force: true });

    // then
    cy.isDetailModalClose();
  });
});
