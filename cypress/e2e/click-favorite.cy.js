describe("좋아요 기능 테스트", () => {
  it("식당 리스트에 있는 별표시를 클릭하면 해당 식당의 별이 채워진다.", () => {
    cy.visit("http://localhost:5173");

    const index = 1;
    cy.get(`#restaurant__info__${index} .restaurant__favorite-mark`).should(
      "have.text",
      "☆"
    );

    cy.get(`#restaurant__info__${index} .restaurant__favorite-mark`).click();

    cy.get(`#restaurant__info__${index} .restaurant__favorite-mark`).should(
      "have.text",
      "★"
    );
  });
});
