describe("detailModal E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("list-item 클릭시, detail 모달창이 활성화된다.", () => {
    cy.get("li.restaurant ").first().click();
    cy.get(".modal--open").should("exist");
  });

  it("detail 모달창을 활성화 후, 닫기 버튼을 누르면 모달이 닫힌다.", () => {
    cy.get("li.restaurant").first().click();
    cy.get(".modal.modal--open button[type='button']").click();

    setTimeout(() => {
      cy.get(".modal--open").should("not.be.visible");
    }, 1000);
  });

  it("detail 모달창을 활성화 후, 삭제하기 버튼을 누르면 실제 리스트에 반영이 되었는지 확인한다.", () => {
    cy.get("li.restaurant").first().invoke("text").as("deletedRestaurantName");

    cy.get("li.restaurant").first().click();
    cy.get(".modal.modal--open button[type='submit']").click();

    cy.get("@deletedRestaurantName").then((restaurantName) => {
      cy.get("li.restaurant").contains(restaurantName.trim()).should("not.exist");
    });
  });

  it("detail 모달창을 활성화 후, 삭제하기 버튼을 누르고 새로고침 후에도 실제 리스트에 반영이 되었는지 확인한다.", () => {
    cy.get("li.restaurant").first().invoke("text").as("deletedRestaurantName");

    cy.get("li.restaurant").first().click();
    cy.get(".modal.modal--open button[type='submit']").click();

    cy.reload();

    cy.get("@deletedRestaurantName").then((restaurantName) => {
      cy.get("li.restaurant").contains(restaurantName.trim()).should("not.exist");
    });
  });
});
