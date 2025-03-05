it("음식점 추가 테스트", () => {
  cy.visit("http://localhost:5173/");

  // 모달 띄우기
  cy.get(".gnb__button").click();
  cy.get(".modal").should("be.visible");
  cy.get(".restaurant-add-form").should("exist");

  // 모달 닫기
  cy.get(".cancel-button").click();
  cy.get(".modal").should("not.be.visible");

  // 모달 띄우기
  cy.get(".gnb__button").click();
  cy.get(".modal").should("be.visible");
  cy.get(".restaurant-add-form").should("exist");

  // 폼 데이터 입력
  cy.get("#category").select("중식");
  cy.get("#name").type("마담밍");
  cy.get("#distance").select("20");

  // 폼 제출
  cy.get(".restaurant-add-form").submit();
  cy.get(".restaurant-list").should("have.length", 1);
});
