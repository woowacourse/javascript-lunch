describe("식당 삭제 테스트", () => {
  it("상세보기 모달창에서 삭제를 누르면 해당 식당이 삭제된 리스트가 보인다.", () => {
    //given
    cy.visit("http://localhost:5173");
    const index = 1;

    //when
    cy.get(`#restaurant__info__${index} .restaurant__name`).click();
    cy.get(".modal-container #delete-button").click();
    cy.on("window:confirm", () => true);

    //then
    cy.get(`#restaurant__info__${index}`).should("not.exist");
  });
});
