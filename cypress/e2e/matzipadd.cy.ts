describe('맛집 추가 테스트', () => {
  it('쿠키네칼국수 맛집을 추가하면 리스트에 쿠키네칼국수가 추가된다.', () => {
    // given
    cy.visit('http://localhost:8080/');
    const category = '한식';
    const name = '쿠키네칼국수';
    const distance = 5;
    const description = '맛있는 쿠키네 칼국수';
    const link = 'https://techcourse.woowahan.com/';
    
    // when
    cy.get('header > button').click({force: true});
    cy.get('#category').select(category, {force: true});
    cy.get('#name').type(name, {force: true});
    cy.get('#distance').select(distance, {force: true});
    cy.get('#description').type(description, {force: true});
    cy.get('#link').type(link, {force: true});
    cy.get('.form-submit').click({force: true});

    // then
    cy.get('#restaurant-lists').children().last().get('.restaurant__name').should('have.text', '쿠키네칼국수');
  });
});

