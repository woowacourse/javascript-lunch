describe("입력값 검증 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get("#header-icon").click();
  });

  it("거리를 선택하지 않고 저장하기 버튼을 클릭하면 경고 문구를 보여주는 alert이 띄운다.", () => {
    cy.get("#store-name-textarea").type("피양콩할마니");
    cy.get("#category-select-button").click();
    cy.get("#category-select-dropdown li").contains("한식").click();
    cy.get("#submit-btn").click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("거리를 선택해주세요.");
    });
  });

  it("음식점 이름을 입력하지 않고 저장하기 버튼을 클릭하면 경고 문구를 보여주는 alert을 띄운다.", () => {
    cy.get("#distance-select-button").click();
    cy.get("#distance-select-dropdown li").contains("5분").click();
    cy.get("#category-select-button").click();
    cy.get("#category-select-dropdown li").contains("한식").click();
    cy.get("#submit-btn").click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("음식점 이름 입력해주세요.");
    });
  });

  it("https로 시작하지 않는, 올바르지 않은 링크 입력 시 경고 문구를 보여주는 alert 띄운다.", () => {
    cy.get("#store-name-textarea").type("피양콩할마니");
    cy.get("#distance-select-button").click();
    cy.get("#distance-select-dropdown li").contains("5분").click();
    cy.get("#category-select-button").click();
    cy.get("#category-select-dropdown li").contains("한식").click();
    cy.get("#link-textarea").type("세라의 링크");
    cy.get("#submit-btn").click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("링크 형식이 올바르지 않습니다.");
    });
  });
});
