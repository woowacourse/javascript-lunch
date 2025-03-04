describe("추가하기 버튼을 눌렀을때", () => {
  it("form에 입력된 정보를 가져온다", () => {
    cy.visit("http://localhost:5173");

    //given
    const info = {
      category: "한식",
      name: "친친",
      distance: "5",
      description: "친친 가지덮밥이 맛있어요",
      link: "http://localhost.30000",
    };

    cy.get("#register-form").within(() => {
      // cy.viewport(1280, 1000);
      cy.get("#category").select(info.category);
      cy.get("#name").type(info.name);
      cy.get("#distance").select(info.distance);
      cy.get("#description").type(info.description);
      cy.get("#link").type(info.link);
    });
    //when
    cy.get("#register-button").click();
    //then
    const lastItem = cy.get(".restaurant-list").children().last();
    lastItem.should("contain.text", info.name);
    lastItem.should("contain.text", info.distance);
    lastItem.should("contain.text", info.description);
  });
});
