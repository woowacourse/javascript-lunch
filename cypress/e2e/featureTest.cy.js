describe('기능 테스트: 음식을 추가하는 시나리오 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('사용자가 음식점 추가 모달을 열어, 모든 필드를 입력 후 음식점을 추가하는 시나리오 테스트', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal--open').should('exist');

    cy.get('#category').select('한식');
    cy.get('#name').type('꺼벙이');
    cy.get('#distance').select('15분 내');
    cy.get('#description').type('꺼벙이 분식');
    cy.get('#link').type('https://naver.me/G6DyD9tg');

    cy.get('.add-item-button').click();
    cy.get('.restaurant-list').should('contain', '꺼벙이');
  });

  it('사용자가 음식점 추가 모달을 열어, 필수 입력값만 입력 후 추가하는 시나리오 테스트', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal--open').should('exist');

    cy.get('#category').select('한식');
    cy.get('#name').type('꺼벙이');
    cy.get('#distance').select('15분 내');

    cy.get('.add-item-button').click();
    cy.get('.restaurant-list').should('contain', '꺼벙이');
  });
});

describe('기능 테스트: 음식 추가를 취소하는 시나리오 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('사용자가 음식점 추가 모달을 연 후, 음식점 추가 중 취소하기 버튼을 클릭하여 음식점 추가를 취소하는 시나리오 테스트', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal--open').should('exist');

    cy.get('#category').select('한식');
    cy.get('#name').type('꺼벙이');
    cy.get('#distance').select('15분 내');
    cy.get('#description').type('꺼벙이 분식');
    cy.get('#link').type('https://naver.me/G6DyD9tg');

    cy.get('#new-restaurant-form').within(() => {
      cy.get('.close-modal-button').click();
    });

    cy.get('.modal--open').should('not.exist');
    cy.get('.restaurant-list').should('not.contain', '꺼벙이');
  });

  it('사용자가 음식점 추가 모달을 연 후, ESC 키를 클릭하여 음식점 추가를 취소하는 시나리오 테스트', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal--open').should('exist');

    cy.document().trigger('keydown', { key: 'Escape', keyCode: 27, which: 27 });
    cy.get('.modal--open').should('not.exist');
  });

  it('사용자가 음식점 추가 모달을 연 후, 모달 외부를 클릭하여 음식점 추가를 취소하는 시나리오 테스트', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal--open').should('exist');

    cy.get('.add-restaurant-modal').within(() => {
      cy.get('.modal-backdrop').invoke('css', 'z-index', '9999').click();
    });

    cy.get('.modal--open').should('not.exist');
  });
});

describe('기능 테스트: 모달 기능 동작 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('사용자가 음식점 추가 모달을 연 후, 모달을 닫았다가 다시 열었을 때 필드가 초기화 되는 시나리오 테스트', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal--open').should('exist');

    cy.get('#category').select('한식');
    cy.get('#name').type('꺼벙이');
    cy.get('#distance').select('15분 내');

    cy.get('#new-restaurant-form').within(() => {
      cy.get('.close-modal-button').click();
    });

    cy.get('.gnb__button').click();
    cy.get('.modal--open').should('exist');

    cy.get('#category').should('have.value', '');
    cy.get('#name').should('have.value', '');
    cy.get('#distance').should('have.value', 'null');
  });

  it('사용자가 모달의 필수 필드 입력창에 아무것도 입력하지 않고 추가하기 버튼을 클릭하는 시나리오 테스트', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal--open').should('exist');

    cy.get('.add-item-button').click();
    cy.get('.modal--open').should('exist');
  });
});

const setLocalStorage = () => {
  cy.clearLocalStorage();
  cy.window()
    .its('localStorage')
    .invoke(
      'setItem',
      'restaurants',
      JSON.stringify([
        {
          id: 0,
          category: 'WESTERN',
          name: '이태리키친',
          distance: 20,
          description: '늘 변화를 추구하는 이태리키친입니다.',
          link: '',
          favorite: false,
        },
        {
          id: 1,
          category: 'ASIAN',
          name: '호아빈 삼성점',
          distance: 15,
          description: '푸짐한 양에 국물이 일품인 쌀국수',
          link: '',
          favorite: false,
        },
      ]),
    );

  cy.reload();
};

describe('기능 테스트: 음식점 상세 정보 확인 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    setLocalStorage();
  });

  it('사용자가 음식점 아이템을 클릭하여 상세 정보 확인하는 시나리오 테스트', () => {
    cy.get('.restaurant').first().click();
    cy.get('.modal--open').should('exist');

    cy.get('.restaurant__category > img').should('have.attr', 'alt', 'WESTERN');
    cy.get('.restaurant__name').should('exist').contains('이태리키친');
    cy.get('.restaurant__distance').should('exist').contains(20);

    cy.get('.restaurant__favorite').should('exist');
  });
});

describe('기능 테스트: 음식점 상세 정보 모달 닫기 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    setLocalStorage();

    cy.get('.restaurant').first().click();
    cy.get('.modal--open').should('exist');
  });

  it('사용자가 닫기 버튼을 클릭하여 음식점 상세 정보 모달을 닫는 시나리오 테스트', () => {
    cy.get('.restaurant-info-modal .button--secondary').click();
    cy.get('.modal--open').should('not.exist');
  });

  it('사용자가 음식점 상세 정보 모달을 연 후, ESC 키를 클릭하여 모달을 닫는 시나리오 테스트', () => {
    cy.document().trigger('keydown', { key: 'Escape', keyCode: 27, which: 27 });
    cy.get('.modal--open').should('not.exist');
  });

  it('사용자가 음식점 상세 정보 모달을 연 후, 모달 외부를 클릭하여 모달을 닫는 시나리오 테스트', () => {
    cy.get('.restaurant-info-modal').within(() => {
      cy.get('.modal-backdrop').invoke('css', 'z-index', '9999').click();
    });

    cy.get('.modal--open').should('not.exist');
  });
});

describe('기능 테스트: 음식점 삭제 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    setLocalStorage();
  });

  it('사용자가 상세 정보 모달의 "삭제하기" 버튼을 클릭하여 음식점을 삭제하는 시나리오 테스트', () => {
    cy.get('.restaurant').first().click();
    cy.get('.modal--open').should('exist');

    cy.get('.delete-item-button').click();
    cy.get('.modal--open').should('not.exist');
    cy.get('.restaurant').should('not.have.attr', 'data-id', '0');
  });
});

describe('기능 테스트: 자주 가는 음식점 추가 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    setLocalStorage();
  });

  it('사용자가 음식점 상세 정보 모달에서 추가/해제 버튼을 클릭하여 추가하는 시나리오 테스트', () => {
    cy.get('.restaurant').first().click();
    cy.get('.modal--open').should('exist');

    cy.get('.restaurant-info-modal .restaurant__favorite').click();
    cy.get('.restaurant-info-modal .button--primary').click();
    cy.get('.modal--open').should('not.exist');

    cy.get('[data-tab="favorite"]').click();
    cy.get('.restaurant').should('have.attr', 'data-id', '0');
  });

  it('사용자가 음식점 목록에서 추가/해제 버튼을 클릭하여 추가하는 시나리오 테스트', () => {
    cy.get('.restaurant .restaurant__favorite').first().click();

    cy.get('[data-tab="favorite"]').click();
    cy.get('.restaurant').should('have.attr', 'data-id', '0');
  });
});
