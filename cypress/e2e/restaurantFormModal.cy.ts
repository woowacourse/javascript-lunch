describe('음식점 추가 테스트', () => {
  const fillOutForm = ({ name, category, distance, description, link }) => {
    cy.get('[data-cy=category]').find('select').select(category);
    cy.get('[data-cy=name]').find('input').type(name);
    cy.get('[data-cy=distances]').find('select').select(distance);
    if (description) cy.get('[data-cy="description"]').find('textarea').type(description);
    if (link) cy.get('[data-cy="link"]').find('input').type(link);
  };

  beforeEach(() => {
    cy.visit('');

    cy.get('[data-cy="add-button"]').click();
  });

  it('GNB의 음식점 추가 버튼을 누르면 입력 폼 모달이 나타난다.', () => {
    cy.get('[data-cy="modal-container"]').should('be.visible');
    cy.get('[data-cy="modal-container"]').find('.modal-title').should('exist').and('have.text', '새로운 음식점');
    cy.get('[data-cy="modal-container"]').find('form#restaurant-form').should('exist');
  });

  it('취소하기 버튼을 눌러 모달을 닫을 수 있다.', () => {
    cy.fixture('dummyRestaurant').then((dummyRestaurant) => {
      fillOutForm(dummyRestaurant);
    });

    cy.get('[data-cy="reset"]').click();
    cy.get('[data-cy="modal-container"]').should('not.be.visible');
  });

  it('카테고리, 이름, 거리, 설명, 링크를 입력한 후 제출하면 모달이 닫히고 음식점 리스트가 업데이트된다.', () => {
    cy.fixture('dummyRestaurant').then((dummyRestaurant) => {
      fillOutForm(dummyRestaurant);
    });

    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="modal-container"]').should('not.be.visible');
    cy.get('[data-cy="restaurant-list"]').children('li').should('have.length', 1);
  });
});
