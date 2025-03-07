describe("main E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500");
  });

  it("listItem 생성을 확인한다.", () => {
    cy.get("header button").click();

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

    setTimeout(() => {
      cy.get(".modal--open").should("not.exist");
    }, 1000);
  });

  it("모달창을 활성화 후, 취소하기 버튼을 누르면 모달이 닫힌다.", () => {
    cy.get("header button").click();
    cy.get(".modal form button[type='button']").click();

    setTimeout(() => {
      cy.get(".modal--open").should("not.exist");
    }, 1000);
  });

  it("모달창을 활성화 후, 백드롭 누르면 모달이 닫힌다.", () => {
    cy.get("header button").click();
    cy.get(".modal-backdrop").click({ force: true });

    setTimeout(() => {
      cy.get(".modal--open").should("not.exist");
    }, 1000);
  });
});
