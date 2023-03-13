describe('점심 뭐 먹지 e2e 테스트', () => {
  it('음식점 추가, 삭제, 필터링 테스트', () => {
    const yeoptoRestaurant = {
      ID: 1,
      category: '기타',
      name: '엽토네 떡볶이',
      distance: 5,
      favorites: true,
      description: '아주 매움😈',
      link: '',
    };

    if (!localStorage.getItem('restaurants')) {
      localStorage.setItem('restaurants', JSON.stringify([yeoptoRestaurant]));
    }

    cy.visit('http://localhost:8080');
    cy.viewport(500, 1000);

    //음식점 추가
    cy.get('.gnb__button').click();
    cy.get('#category').select('한식');
    cy.get('#name').type('다올김밥');
    cy.get('#distance').select('10분 내');
    cy.get('#description').type('집 앞 분식점');
    cy.get('form .button--primary').click();

    cy.get('.gnb__button').click();
    cy.get('#category').select('기타');
    cy.get('#name').type('교촌치킨');
    cy.get('#distance').select('30분 내');
    cy.get('#description').type('영양간식');
    cy.get('form .button--primary').click();

    cy.get('.gnb__button').click();
    cy.get('#category').select('기타');
    cy.get('#name').type('맥도날드');
    cy.get('#distance').select('20분 내');
    cy.get('#description').type('주식');
    cy.get('form .button--primary').click();

    //음식점 삭제
    cy.contains('다올김밥').click();
    cy.get('.restaurant-item-modal .button--secondary').click();

    //음식점 필터링
    cy.get('#category-filter').select('기타');
    cy.get('#sorting-filter').select('거리순');

    //리스트 확인
    cy.get('.restaurant-list').first().should('contain.text', '엽토네 떡볶이');
    cy.get('.restaurant-list').last().should('contain.text', '교촌치킨');

    //자주 가는 음식점 추가
    cy.contains('맥도날드').parentsUntil('.restaurant-list').children('.favorite-icon').click();
    cy.contains('자주 가는 음식점').click();

    //자주 가는 음식점 확인
    cy.get('.restaurant-list').children().should('have.length', 2);
  });
});
