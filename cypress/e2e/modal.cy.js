describe("modal E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500");
  });

  it("select-form 태그가 있는지 확인한다.", () => {
    cy.get(".form-item select").should("exist");
  });

  it("input-form 태그가 있는지 확인한다.", () => {
    cy.get(".form-item input").should("exist");
  });

  it("textarea-form 태그가 있는지 확인한다.", () => {
    cy.get(".form-item textarea").should("exist");
  });

  it("button-form 태그가 있는지 확인한다.", () => {
    cy.get("form button").should("exist");
  });

  it("모달 등록하기 버튼 클릭시, listItem 생성을 확인한다.", () => {
    const inputTest = {
      category: "한식",
      name: "칼국수",
      distance: `5분 내`,
    };

    cy.get(".modal form select[name='category']").invoke("val", inputTest.category);
    cy.get(".modal form input[name='name']").invoke("val", inputTest.name);
    cy.get(".modal form select[name='distance']").invoke("val", inputTest.distance);

    cy.get(".modal form").submit();

    cy.get(".restaurant-list li").should("contain", inputTest.name).and("contain", inputTest.distance);
  });

  it("모달에서 취소하기 버튼 클릭시, 모달 닫힘을 확인한다.", () => {
    cy.get("header button").click();
    cy.get(".modal form button[type='button']").click();

    setTimeout(() => {
      cy.get(".modal--open").should("not.exist");
    }, 1000);
  });

  it("모달에서 백드롭 클릭시, 모달 닫힘을 확인한다.", () => {
    cy.get("header button").click();
    cy.get(".modal-backdrop").click({ force: true });

    setTimeout(() => {
      cy.get(".modal--open").should("not.exist");
    }, 1000);
  });
});
