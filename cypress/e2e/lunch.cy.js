describe('자주 가는 음식점 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.viewport(1680, 965);
  });

  it('웹 페이지에 처음 방문했을 때 디폴트 데이터가 음식점 목록에 포함되어 있다.', () => {
    cy.get('.restaurant')
      .first()
      .within(() => {
        cy.get('.category-icon').should('have.attr', 'src', './category-korean.png');
        cy.get('.restaurant__name').should('have.text', '덮밥이맛있는집');
        cy.get('.restaurant__distance').should('contain.text', '15분');
        cy.get('.restaurant__description').should(
          'contain.text',
          '영동칼국수집 옆에 있는 연어덮밥, 스테이크덮밥 등을 파는 덮밥 집'
        );
      });
  });

  it('음식점 추가 버튼을 클릭해 음식점 추가 모달을 연 다음에 정보를 입력하면 음식점 목록에 입력된 정보를 가진 음식점이 추가된다.', () => {
    cy.get('.gnb__button').click();

    cy.get('#category').select('중식');
    cy.get('#name').type('딘타이펑');
    cy.get('#distance').select('30분 내', { force: true });
    cy.get('#description').type('대만이 원조인 딤섬 전문점.');
    cy.get('#link').type('http://www.dintaifung.co.kr/');

    cy.get("button[type='submit']").click();

    cy.get('.restaurant[data-id="9"]').within(() => {
      cy.get('.category-icon').should('have.attr', 'src', './category-chinese.png');
      cy.get('.restaurant__name').should('have.text', '딘타이펑');
      cy.get('.restaurant__distance').should('contain.text', '30분');
      cy.get('.restaurant__description').should('contain.text', '대만이 원조인 딤섬 전문점.');
    });
  });

  it('모든 음식점 탭에서 자주 가는 음식점 목록에 포함되지 않은 음식점의 즐겨찾기 아이콘을 누르면 아이콘이 변한다.', () => {
    cy.get('.restaurant[data-id="8"]').find('.restaurant-star-icon').click();
  });

  it('모든 음식점 탭에서 자주 가는 음식점 목록에서 즐겨찾기 아이콘을 누르면 자주 가는 음식점 목록에 추가된다.', () => {
    cy.get('.restaurant[data-id="7"]').find('.restaurant-star-icon').click();
    cy.get('label[for="favorite-restaurants"]').click();
    cy.get('.restaurant-list').find('.restaurant').should('have.attr', 'data-id', '7');
  });

  it('자주 가는 음식점 탭에서 즐겨찾기 아이콘을 누르면 목록에서 음식점이 사라진다.', () => {
    cy.get('.restaurant[data-id="6"]').find('.restaurant-star-icon').click();
    cy.get('.restaurant[data-id="7"]').find('.restaurant-star-icon').click();

    cy.get('label[for="favorite-restaurants"]').click();

    cy.get('.restaurant[data-id="6"]').find('.restaurant-star-icon').click();
    cy.get('.restaurant-list').find('.restaurant').should('not.have.attr', 'data-id', '6');
  });

  it('음식점 아이템을 클릭하면 음식점 상세 정보 모달을 볼 수 있다.', () => {
    cy.get('.restaurant[data-id="5"]').click();
    cy.get('.restaurant-detail__info-container').should('contain.text', '덮밥이맛있는집');
  });

  it('음식점 상세 정보 모달에서 삭제 버튼을 누르면 음식점 목록에서 해당 음식점이 사라진다.', () => {
    cy.get('.restaurant[data-id="4"]').click();
    cy.get('#restaurant-information-delete-button').click();
    cy.get('.restaurant-list').find('.restaurant').should('not.have.attr', 'data-id', '4');
  });

  it('음식점 상세 정보 모달에서 즐겨찾기 아이콘을 누르면 음식점 목록에서도 즐겨찾기 아이콘이 변한다.', () => {
    cy.get('.restaurant[data-id="3"]').click();
    cy.get('#restaurant-information-star').click();
    cy.get('.restaurant-list')
      .find('.restaurant[data-id="3"]')
      .find('.restaurant-star-icon')
      .should('have.class', 'favorite');
  });

  it('자주 가는 음식점 탭에서 음식점 아이템 클릭 후 음식점 상세 정보 모달에서 즐겨찾기 아이콘을 누르면 음식점 목록에서 해당 음식점이 사라진다.', () => {
    cy.get('.restaurant[data-id="7"]').find('.restaurant-star-icon').click();
    cy.get('.restaurant[data-id="1"]').find('.restaurant-star-icon').click();

    cy.get('label[for="favorite-restaurants"]').click();

    cy.get('.restaurant[data-id="7"]').click();
    cy.get('#restaurant-information-star').click();

    cy.get('.restaurant-list').find('.restaurant').should('not.have.attr', 'data-id', '7');
  });

  it('음시점 상세 정보 모달에서 웹사이트 방문하기를 누르면 음식점 웹사이트가 열린다.', () => {
    cy.get('.gnb__button').click();

    cy.get('#category').select('중식');
    cy.get('#name').type('딘타이펑');
    cy.get('#distance').select('30분 내', { force: true });
    cy.get('#description').type('대만이 원조인 딤섬 전문점.');
    cy.get('#link').type('http://www.dintaifung.co.kr/');
    cy.get("button[type='submit']").click();

    cy.get('.restaurant[data-id="9"]').click();
    cy.get('.restaurant__link').invoke('removeAttr', 'target').click({ force: true });

    cy.origin('http://www.dintaifung.co.kr', () => {
      cy.get('body').should('contain.text', '2013 DINTAIFUNG KOREA.co. LTD.');
    });
  });

  it('모든 음식점 탭에서 전체가 아닌 카테고리를 선택하면 해당 카테고리 음식점들만 볼 수 있다.', () => {
    cy.get('#category-filter').select('한식');
    cy.get('.category-icon').should('have.attr', 'src', './category-korean.png');
  });

  it('모든 음식점 탭에서 정렬 방법으로 거리순을 선택하면 음식점 목록이 거리순으로 정렬된다.', () => {
    cy.get('#sorting-filter').select('거리순');
    cy.get('.restaurant').first().should('contain.text', '찐친');
  });

  it('음식점 추가 후 새로고침 했을 때 추가한 음식점이 음식점 목록에 있다.', () => {
    cy.get('.gnb__button').click();

    cy.get('#category').select('중식');
    cy.get('#name').type('딘타이펑');
    cy.get('#distance').select('30분 내', { force: true });
    cy.get('#description').type('대만이 원조인 딤섬 전문점.');
    cy.get('#link').type('http://www.dintaifung.co.kr/');
    cy.get("button[type='submit']").click();

    cy.reload();

    cy.get('.restaurant-list').find('.restaurant').should('contain.text', '딘타이펑');
  });

  it('자주 가는 음식점 목록에 추가 후 새로고침 했을 때 즐겨찾기 아이콘이 그대로 클릭되어 있다.', () => {
    cy.get('.restaurant[data-id="7"]').find('.restaurant-star-icon').click();

    cy.reload();

    cy.get('.restaurant[data-id="7"]').find('.restaurant-star-icon').should('have.class', 'favorite');
  });
});
