describe("음식점 정보 입력하는 모달에 대한 E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");

    cy.get('[data-testid="open-add-restaurant-modal-button"]').click();
  });

  it("모달이 열린다.", () => {
    cy.get('[data-testid="modal"]').should("exist");
  });

  it("모달의 backdrop을 클릭하여 닫을 수 있다.", () => {
    cy.get('[data-testid="modal-backdrop"]').click(0, 0);

    cy.get('[data-testid="modal"]').should("not.exist");
  });

  it("모달의 취소하기 버튼을 클릭하여 닫을 수 있다.", () => {
    cy.get('[data-testid="cancel-add-restaurant-form"]').click();

    cy.get('[data-testid="modal"]').should("not.exist");
  });

  it("모달의 입력폼에 음식점 정보를 입력하고 확인하기 버튼을 클릭하여 음식점 정보를 추가할 수 있다.", () => {
    cy.get('[data-testid="category"]').select("한식");
    cy.get('[data-testid="restaurant-name"]').type("맛있는 떡볶이");
    cy.get('[data-testid="distance"]').select("5");
    cy.get('[data-testid="description"]').type("맛있는 떡볶이입니다");
    cy.get('[data-testid="link"]').type("https://www.google.com");

    cy.get('[data-testid="add-restaurant-form"]').submit();

    cy.get('[data-testid="modal"]').should("not.exist");
    // 리스트 첫 번째 아이템이 추가한 음식점 정보인지 확인
    cy.get('[data-testid="restaurant-list"')
      .children()
      .first()
      .should("contain.text", "맛있는 떡볶이");
  });

  it("모달의 입력폼에 음식점 정보를 입력하지 않고 추가하기 버튼을 클릭하면 경고창이 뜬다.", () => {
    cy.get('[data-testid="add-restaurant-form"]').submit();

    // 경고창이 뜨는지 확인
    cy.get('[data-testid="category"]').then(($input) => {
      expect($input[0].validationMessage).to.exist;
    });
  });
});
