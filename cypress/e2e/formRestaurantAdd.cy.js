const ERROR_PREFIX = '❌';

const RESTAURANT_ERROR_MESSAGES = Object.freeze({
  DUPLICATE_NAME: '중복된 이름이 존재합니다.',
});

describe('레스토랑 추가 formModal 테스트', () => {
  it('레스토랑 추가 formModal에서 취소하기 버튼을 클릭 시, formModal이 닫힌다.', () => {
    cy.customVisit();

    cy.get('#add-restaurant-button').click();
    cy.contains('취소하기').click();

    cy.get('#add-form-modal').should('not.have.class', 'modal--open');
  });

  it('레스토랑 추가 버튼 클릭 후, 레스토랑 추가시 UI에 표시되고 데이터에도 추가된다.', () => {
    cy.customVisit();

    // 레스토랑 추가 formModal 열기
    cy.get('#add-restaurant-button').click();

    // 레스토랑 정보 입력
    cy.get('#form-category-select-container[name=category]').select('중식');
    cy.get('input[name=name]').type('마스터위 반점');
    cy.get('select[name=distance]').select('5');
    cy.get('textarea[name=description]').type('신속 배달!');
    cy.get('input[name=link]').type('http://google.com');

    // form 제출
    cy.contains('추가하기').click();

    // formModal 닫기
    cy.get('#add-form-modal').should('not.have.class', 'modal--open');

    // UI 화면에 추가한 레스토랑 렌더링
    cy.contains('마스터위 반점').should('exist');

    // 데이터 상에서 추가한 레스토랑이 있는지 확인
    cy.getAllLocalStorage().then((result) => {
      const localStorageData = JSON.parse(result['http://localhost:8080'].restaurants);
      const hasRestaurant = localStorageData.some((restaurant) => restaurant.name === '마스터위 반점');

      expect(hasRestaurant).to.be.true;
    });
  });

  it('레스토랑 추가 버튼 클릭 후, 중복된 레스토랑 이름을 제출 시 에러를 발생한다.', () => {
    cy.customVisit();

    // 레스토랑 추가 formModal 열기
    cy.get('#add-restaurant-button').click();

    // 레스토랑 정보 입력
    cy.get('#form-category-select-container[name=category]').select('한식');
    cy.get('input[name=name]').type('농민백암순대 본점');
    cy.get('select[name=distance]').select('5');
    cy.get('textarea[name=description]').type('신속 배달!');
    cy.get('input[name=link]').type('http://google.com');

    // form 제출
    cy.contains('추가하기').click();

    cy.on('window:alert', (message) => {
      expect(message).to.equal(`${ERROR_PREFIX} ${RESTAURANT_ERROR_MESSAGES.DUPLICATE_NAME}`);
    });
  });
});
