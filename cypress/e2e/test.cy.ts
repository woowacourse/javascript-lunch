/* eslint-disable max-lines-per-function */
describe('초기 렌더링 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('모든 element들이 제대로 생성되어야 한다.', () => {
    cy.get('lunch-app').find('lunch-header').should('exist');
    cy.get('lunch-app').find('lunch-item-filter').should('exist');
    cy.get('lunch-app').find('lunch-items').should('exist');
    cy.get('lunch-app').find('lunch-register-modal').should('exist');
    cy.get('lunch-app').find('lunch-item-modal').should('exist');
  });

  it('modal component들은 초기에 보이지 않아야 한다.', () => {
    cy.get('lunch-register-modal').should('be.hidden');
    cy.get('lunch-item-modal').should('be.hidden');
  });
});

describe('flow: 새 음식점 등록 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.gnb__button').click();
  });

  it('RegisterModal의 dimmedLayer 영역을 클릭하면 모달이 닫힌다.', () => {
    cy.get('lunch-register-modal').find('.modal-container').should('be.visible');
    cy.get('lunch-register-modal').find('.modal-backdrop').click({ force: true });
    cy.get('lunch-register-modal').find('.modal-container').should('not.be.visible');
  });

  it('취소하기 버튼을 누르면 모달이 닫힌다.', () => {
    cy.get('lunch-register-modal').find('.modal-container').should('be.visible');
    cy.contains('취소하기').click();
    cy.get('lunch-register-modal').find('.modal-container').should('not.be.visible');
  });

  it('필수 항목들이 채워지지 않은 채 등록 버튼을 누를 경우, 등록되지 않는다.', () => {
    cy.get('lunch-register-modal').find('.modal-container').should('be.visible');
    cy.contains('추가하기').click({ force: true });
    cy.get('lunch-register-modal').find('.modal-container').should('be.visible');
    cy.get('lunch-items').should('not.contain', '새로운 식당');
  });

  it('필수 항목들을 모두 채운 뒤 등록 버튼을 누르면 등록되어 리스트의 최 상단에 정상적으로 출력되며, 모든 form은 초기화 된다.', () => {
    cy.get('lunch-register-modal').find('.modal-container').should('be.visible');
    cy.get('lunch-form-item[name="category"] select').select('양식');
    cy.get('lunch-form-item[name="name"] input').type('새로운 식당');
    cy.get('lunch-form-item[name="distance"] select').select('20');
    cy.contains('추가하기').click({ force: true });
    cy.get('lunch-register-modal').find('.modal-container').should('not.be.visible');
    cy.get('lunch-items').find('.restaurant__name').contains('새로운 식당');
  });

  it('등록한 뒤 모든 inputForm들은 초기화 된다.', () => {
    cy.get('lunch-register-modal').find('.modal-container').should('be.visible');
    cy.get('lunch-form-item[name="category"] select').select('양식');
    cy.get('lunch-form-item[name="name"] input').type('새로운 식당');
    cy.get('lunch-form-item[name="distance"] select').select('20');
    cy.get('lunch-form-item[name="description"] textArea').type('설명입니다');
    cy.get('lunch-form-item[name="link"] input').type('http://link.com');
    cy.contains('추가하기').click({ force: true });
    cy.get('lunch-register-modal').find('.modal-container').should('not.be.visible');
    cy.get('.gnb__button').click();
    cy.get('lunch-form-item[name="category"] select').should('have.value', '');
    cy.get('lunch-form-item[name="name"] input').should('have.value', '');
    cy.get('lunch-form-item[name="distance"] select').should('have.value', '');
    cy.get('lunch-form-item[name="description"] textarea').should('have.value', '');
    cy.get('lunch-form-item[name="link"] input').should('have.value', '');
  });
});

describe('flow: filter dropdown 정렬 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('선택된 category 필터의 조건에 맞게 음식점 정보들이 올바르게 출력돼야 한다.', () => {
    cy.get('lunch-item-filter').find('#category-dropdown').select('한식');
    cy.get('lunch-item-filter').trigger('changeDropdown');
    cy.get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant-item')
      .each(($el) => {
        expect($el.text()).to.contain('한식');
      });
    cy.get('lunch-item-filter').find('#category-dropdown').select('양식');
    cy.get('lunch-item-filter').trigger('changeDropdown');
    cy.get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant-item')
      .each(($el) => {
        expect($el.text()).to.contain('양식');
      });
  });

  it('선택된 정렬 방법의 조건에 맞게 음식점 정보들이 올바르게 출력돼야 한다.', () => { });
});

describe('flow: 아이템 클릭 시 상세모달 출력 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('리스트의 아이템을 클릭하면, 클릭한 아이템과 일치하는 상세정보를 볼 수 있는 modal이 출력돼야 한다.', () => {
    cy.get('lunch-items').find('.restaurant-list').find('.restaurant').eq(1).click({ force: true });
    cy.get('lunch-item-modal').find('.modal').find('.modal-container').should('be.visible');

    const clickedItemName = cy
      .get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant')
      .eq(1)
      .find('.restaurant__name')
      .invoke('text');
    const clickedItemDistance = cy
      .get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant')
      .eq(1)
      .find('.restaurant__distance')
      .invoke('text');

    cy.get('lunch-item-modal').find('.restaurant__name').should('contain.text', clickedItemName);
    cy.get('lunch-item-modal')
      .find('.restaurant__distance')
      .should('contain.text', clickedItemDistance);
  });

  it('상세 모달의 dimmedLayer 영역을 클릭하면 모달이 닫혀야 한다.', () => {
    cy.get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant')
      .first()
      .click({ force: true });
    cy.get('lunch-item-modal').find('.modal-container').should('be.visible');

    cy.get('lunch-item-modal').find('.modal-backdrop').click({ force: true });
    cy.get('lunch-item-modal').find('.modal-container').should('not.be.visible');
  });

  it('상세 모달의 닫기 버튼을 클릭하면 모달이 닫혀야 한다.', () => {
    cy.get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant')
      .first()
      .click({ force: true });
    cy.get('lunch-item-modal').find('.modal-container').should('be.visible');

    cy.get('lunch-item-modal').find('.button-container').contains('닫기').click({ force: true });
    cy.get('lunch-item-modal').find('.modal-container').should('not.be.visible');
  });

  it('상세 모달의 삭제하기 버튼을 클릭하면 모달이 닫히고 해당 목록이 삭제되어야 한다.', () => {
    cy.get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant')
      .first()
      .click({ force: true });
    cy.get('lunch-item-modal').find('.modal-container').should('be.visible');
    const firstItemName = cy
      .get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant')
      .first()
      .find('.restaurant__name')
      .invoke('text');

    cy.get('lunch-item-modal')
      .find('.button-container')
      .contains('삭제하기')
      .click({ force: true });
    cy.get('lunch-item-modal').should('not.be.visible');

    cy.get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant')
      .each(($el) => {
        expect($el.find('restaurant__name')).not.to.contain(firstItemName);
      });
  });
});

describe('flow: 즐겨찾는 음식점 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('favorite-icon은 클릭할 때 마다, 상태가 전환된다.', () => {
    cy.get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant')
      .first()
      .find('.favorite-icon')
      .click({ force: true });
    cy.get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant')
      .first()
      .find('.favorite-icon')
      .should('have.attr', 'src', 'http://localhost:8080/favorite-icon-filled.png');
    cy.get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant')
      .first()
      .find('.favorite-icon')
      .click({ force: true });
    cy.get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant')
      .first()
      .find('.favorite-icon')
      .should('have.attr', 'src', 'http://localhost:8080/favorite-icon-lined.png');
  });
  it('즐겨찾는 음식점은 자주가는 음식점 탭을 눌러서 모아볼 수 있다.', () => {
    const firstItemName = cy
      .get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant')
      .eq(1)
      .find('.restaurant__name')
      .invoke('text');
    cy.get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant')
      .eq(1)
      .find('.favorite-icon')
      .click({ force: true });
    const secondItemName = cy
      .get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant')
      .eq(2)
      .find('.restaurant__name')
      .invoke('text');
    cy.get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant')
      .eq(2)
      .find('.favorite-icon')
      .click({ force: true });
    cy.get('.tab-button[name=favorite-restaurants]').click({ force: true });
    cy.get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant')
      .each(($el) => {
        expect($el.find('restaurant__name')).to.contain(firstItemName || secondItemName);
      });
  });

  it('자주가는 음식점에서 favorite 아이콘을 누르면 자주가는 음식점 리스트에서 사라진다.', () => {
    cy.get('lunch-tab').find('.tab-button').eq(1).click({ force: true });
    cy.get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant-item')
      .eq(0)
      .find('.favorite-icon')
      .click();
    cy.get('lunch-tab').find('.tab-button').eq(1).click({ force: true });
    cy.get('lunch-items')
      .find('.restaurant-list')
      .find('.restaurant-item')
      .eq(0)
      .should('not.contain', '.favorite-icon');
  });
  it('item detail modal에서도 즐겨찾기 추가 제거의 마찬가지 기능을 한다.', () => { });
});
