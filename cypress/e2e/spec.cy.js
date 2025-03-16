beforeEach(() => {
  cy.visit('http://localhost:5173/');
});

describe('탭 전환', () => {
  it('자주 가는 음식점 탭 클릭 시 즐겨찾기된 음식점만 표시되어야 함', () => {
    cy.get('#nav-tab-2').click();
    cy.get('.restaurant').each(($el) => {
      cy.wrap($el)
        .find('.restaurant__favorite-button img')
        .should('have.attr', 'src')
        .and('include', 'favorite');
    });
  });
});

describe('필터링', () => {
  it('카테고리 필터 동작 확인', () => {
    cy.get('#category-filter').select('한식');
    cy.get('.restaurant').should('have.length.gt', 0);
  });

  it('정렬 필터 동작 확인', () => {
    cy.get('#sorting-filter').select('거리순');
    cy.wait(100); //상태 변화 대기 시간

    cy.get('.restaurant').each(($el) => {
      let previousDistance = 0;
      cy.wrap($el)
        .find('.restaurant__distance')
        .invoke('text')
        .then((text) => {
          const distance = parseInt(text.match(/\d+/)[0]);
          expect(distance).to.be.at.least(previousDistance);
          previousDistance = distance;
        });
    });
  });
});

describe('좋아요 기능', () => {
  it('좋아요 버튼 클릭 시 상태가 변경되어야 함', () => {
    cy.get('.restaurant__favorite-button').first().click();
    cy.get('.restaurant__favorite-button img')
      .should('have.attr', 'src')
      .and('include', 'favorite');
  });

  it('좋아요 상태가 localStorage에 저장되어야 함', () => {
    cy.get('.restaurant__favorite-button').first().click();
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'restaurant')
      .should('include', '"isFavorite":true');
  });
});

describe('바텀시트', () => {
  it('레스토랑 클릭 시 바텀시트가 열려야 함', () => {
    cy.get('.restaurant__container').first().click();
    cy.get('.modal-container').should('be.visible');
  });

  it('바텀시트에서 좋아요 토글이 동작해야 함', () => {
    cy.get('.restaurant__container').first().click();
    cy.get('.modal .restaurant__favorite-button').click();
    cy.get('.restaurant__favorite-button img')
      .should('have.attr', 'src')
      .and('include', 'favorite');
  });

  it('바텀시트 닫기가 정상 동작해야 함', () => {
    cy.get('.restaurant__container').first().click();
    cy.get('#bottom-sheet-restaurant-close-button').click();
    cy.get('.modal-container').should('not.exist');
  });

  it('바텀시트 내 삭제하기 버튼 클릭 시 로컬 스토리지에서 삭제 되어야 함', () => {
    cy.get('.restaurant__container').first().click();
    cy.get('#bottom-sheet-restaurant-delete-button').click();
    cy.window()
      .its('localStorage.restaurant')
      .then(JSON.parse)
      .should('have.length', 5);
  });
});
