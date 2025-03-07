describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:5173/");
  });
});

describe("Test Group", () => {
  it("adds todos", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#nickname").type(nickname);
    cy.contains("추가").click();
    cy.get(".nickname-list").children().last().should("contain.text", nickname);
  });
});

// // 보임
// cy.get('.login').should('be.visible');

// // 'form-horizontal' 클래스가 있음
// cy.get('form').should('have.class', 'form-horizontal');

// // value가 'Jane'이 아님
// cy.get('input').should('not.have.value', 'Jane');

// // 텍스트가 '10'
// cy.get('.value').should('have.text', '10');

// // disabled 속성이 있음(true)
// cy.get('.btn-inc').should('have.attr', 'disabled');
