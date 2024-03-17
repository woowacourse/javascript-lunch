const dummyRestaurantListData = [
  {
    id: 1,
    name: 'ㄱ',
    walkingTime: 5,
    category: '한식',
    link: '',
    description: '',
  },
  {
    id: 2,
    name: 'ㄴ',
    walkingTime: 20,
    category: '양식',
    link: '',
    description: '',
  },
  {
    id: 3,
    name: 'ㄷ',
    walkingTime: 30,
    category: '일식',
    link: '',
    description: '',
  },
  {
    id: 4,
    name: 'ㄹ',
    walkingTime: 15,
    category: '중식',
    link: '',
    description: '',
  },
  {
    id: 5,
    name: 'ㅁ',
    walkingTime: 5,
    category: '한식',
    link: '',
    description: '',
  },
  {
    id: 6,
    name: 'ㅂ',
    walkingTime: 10,
    category: '아시안',
    link: '',
    description: '',
  },
];
const dummyFavoriteRestaurantListData = [3, 5];
// beforeEach(() => {
//   // 각 테스트가 실행되기 전에 로컬 스토리지를 초기화합니다.
//   cy.clearLocalStorage(); // Cypress에서 제공하는 clearLocalStorage() 메서드를 사용하여 로컬 스토리지를 초기화합니다.
// });
describe('점심 뭐 먹지 E2E테스트', () => {
  beforeEach(() => {
    localStorage.setItem(
      'restaurantList',
      JSON.stringify(dummyRestaurantListData)
    );
    localStorage.setItem(
      'favoriteRestaurantList',
      JSON.stringify(dummyFavoriteRestaurantListData)
    );

    cy.visit('/');
  });

  const testCategoryList = ['한식', '아시안'];

  testCategoryList.forEach((targetCategory) => {
    it(`${targetCategory} 카테고리를 선택하면 해당하는 카테고리의 음식점 목록만 보여준다.`, () => {
      cy.get('select#category-filter').select(targetCategory);

      cy.get('.restaurant-list-container')
        .find('img')
        .each((img) => {
          const category = img.attr('alt');
          expect(category).to.eq(targetCategory);
        });
    });
  });

  it('거리순으로 정렬하면 음식점 목록을 거리순 오름차순으로 정렬해 보여준다.', () => {
    const sortedByWalkingTime = dummyRestaurantListData
      .map(({ walkingTime }) => walkingTime)
      .sort((a, b) => a - b);
    const sorting = '거리순';

    cy.get('select#sorting-filter').select(sorting);
    cy.get('.restaurant__distance').each((distanceElement, i) => {
      const distance = parseInt(distanceElement.text().match(/\d+/)[0], 10);
      expect(distance).to.eq(sortedByWalkingTime[i]);
    });
  });

  it('이름순으로 정렬하면 음식점 목록을 거리순 오름차순으로 정렬해 보여준다.', () => {
    const sortedByName = dummyRestaurantListData
      .map(({ name }) => name)
      .sort((a, b) => {
        if (a > b) return 1;
        else return -1;
      });
    const sorting = '이름순';

    cy.get('select#sorting-filter').select(sorting);
    cy.get('.restaurant__name').each((nameElement, i) => {
      const name = nameElement.text();
      expect(name).to.eq(sortedByName[i]);
    });
  });

  it('리스트에 아무 음식점도 없으면 없다고 문구를 띄워준다.', () => {
    const emptyRestaurantListCategory = '기타';
    cy.get('select#category-filter').select(emptyRestaurantListCategory);

    cy.contains('음식점이 존재하지 않습니다.').should('exist');
  });

  it('모든 음식점에선 필터가 있고, 즐겨찾는 음식점에선 필터가 없다.', () => {
    cy.get('#category-filter').should('exist');
    cy.get('#sorting-filter').should('exist');

    cy.contains('즐겨찾는 음식점').click();

    cy.get('#category-filter').should('not.exist');
    cy.get('#sorting-filter').should('not.exist');
  });

  it('즐겨찾는 음식점의 모든 음식점은 별이 채워진 상태이다.', () => {
    cy.contains('즐겨찾는 음식점').click();

    // ^로 시작 = startsWith
    cy.get('[class^="star__button"]').each(($starButton) => {
      cy.wrap($starButton).should('have.class', 'star__filled');
    });
  });

  it('모달 안의 즐겨찾기 버튼을 누르면 리스트의 즐겨찾기 버튼도 토글된다.', () => {
    /**
     * 리스트의 아이템을 클릭한다.
     * 모달 내부의 별 버튼을 클릭한다.
     * list-container 안의 클릭한 요소의 별 버튼이 토글되었는지 확인한다.
     */

    const targetRestaurantName = dummyRestaurantListData[0].name;
    const targetRestaurantId = dummyRestaurantListData[0].id;

    cy.contains(targetRestaurantName).click();
    cy.get('.modal-container').find('[class^="star__button"]').click();
    cy.get(`#${targetRestaurantId}.restaurant`)
      .find('[class^="star__button"]')
      .should('have.class', 'star__filled');
  });
});
