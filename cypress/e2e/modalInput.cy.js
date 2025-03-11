import { VISIT_URL_CONSTANT } from './constants/visitUrl';
describe('모달창에 입력을 할 수 있다.', () => {
  beforeEach(() => {
    cy.visit(VISIT_URL_CONSTANT.LINK);
    cy.get('.gnb__button').click();
  });

  describe('카테고리를 선택할 수 있다.', () => {
    const categoryList = ['한식', '중식', '일식', '아시안', '양식', '기타'];
    categoryList.forEach((category) => {
      it(`${category}를 선택할 수 있다.`, () => {
        cy.get('#category').select(category).should('have.value', category);
      });
    });

    it('카테고리는 선택은 필수이다.', () => {
      cy.get('.form-item--required').find('#category');
    });
  });

  describe('이름을 작성할 수 있다.', () => {
    it('이름은 작성은 필수이다.', () => {
      cy.get('.form-item--required').find('#name');
    });

    it('이름 작성은 텍스트 인풋을 사용하여 작성한다.', () => {
      cy.get('#name').type('테스트 음식점');
      cy.get('#name').should('have.value', '테스트 음식점');
    });
  });

  describe('거리를 선택할 수 있다.', () => {
    const distanceList = [
      ['5분 내', '5'],
      ['10분 내', '10'],
      ['15분 내', '15'],
      ['20분 내', '20'],
      ['30분 내', '30'],
    ];
    distanceList.forEach((distance) => {
      it('거리를 선택할 수 있다.', () => {
        cy.get('#distance').select(`${distance[0]}`).should('have.value', `${distance[1]}`);
      });
    });
  });

  describe('설명을 작성할 수 있다.', () => {
    it('설명 작성은 텍스트 인풋을 사용하여 작성할 수 있다.', () => {
      cy.get('#description').type('테스트 설명문입니다.');
      cy.get('#description').should('have.value', '테스트 설명문입니다.');
    });
  });

  describe('참고 링크를 작성할 수 있다.', () => {
    it('참고 링크 작성은 텍스트 인풋을 사용하여 작성할 수 있다.', () => {
      cy.get('#link').type('https://github.com');
      cy.get('#link').should('have.value', 'https://github.com');
    });
  });
});

describe('참고 링크를 작성할 수 있다.', () => {
  beforeEach(() => {
    cy.visit(VISIT_URL_CONSTANT.LINK);
    cy.get('.gnb__button').click();
  });

  it('참고 링크 작성은 텍스트 인풋을 사용하여 작성할 수 있다.', () => {
    cy.get('#link').type('https://github.com');
    cy.get('#link').should('have.value', 'https://github.com');
  });
});
