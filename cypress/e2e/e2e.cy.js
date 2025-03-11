describe("e2e 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("e2e 성공사례 테스트", () => {
    cy.get(".gnb__button").should("exist");
    cy.get(".gnb__button").click();
    cy.get(".modal.modal--open").should("exist");
    cy.get('select[name="category"]').select("chinese");
    cy.get('input[name="name"]').type("마담밍");
    cy.get('select[name="distance"]').select("10");
    cy.get('input[name="description"]').type("블루리본 짱 많은 맛집");
    cy.get('input[name="link"]').type(
      "https://map.naver.com/p/entry/place/11707122?lng=127.0502732&lat=37.5035179&placePath=%2Fhome&entry=plt&searchType=place&c=15.00,0,0,0,dh",
    );
    cy.get(".button.button--primary.text-caption").click();
    cy.get(".modal").should("not.have.class", "modal--open");
    cy.get(".restaurant__name").should("contain.text", "마담밍");
  });
  it("e2e 실패사례 테스트", () => {
    cy.get(".gnb__button").should("exist");
    cy.get(".gnb__button").click();
    cy.get(".modal.modal--open").should("exist");
    cy.get('input[name="description"]').type("블루리본 짱 많은 맛집");
    cy.get('input[name="link"]').type(
      "https://map.naver.com/p/entry/place/11707122?lng=127.0502732&lat=37.5035179&placePath=%2Fhome&entry=plt&searchType=place&c=15.00,0,0,0,dh",
    );
    cy.get(".button.button--primary.text-caption").click();
    cy.get(".modal").should("have.class", "modal--open");
  });
});
