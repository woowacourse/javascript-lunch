describe("My First Test", () => {
  it('추가 버튼을 누르고 정보를 입력한 후 "추가하기"버튼을 누르면 화면에 새로운 식당이 추가된다.', () => {
    cy.viewport(390, 880);

    cy.visit("http://localhost:8080/");

    cy.contains("점심 뭐 먹지");

    cy.get(".gnb__button").click();
    cy.get("#category").select("한식");
    cy.get("#name").type("본죽");
    cy.get("#takingTime").select("10");
    cy.get("#description").type("죽이 맛있는 식당");

    cy.get(".modal--submit").click();

    cy.contains("본죽");
  });
});
