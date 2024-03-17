const dummyRestaurantData = [
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
  {
    id: 7,
    name: 'aaaa',
    walkingTime: 15,
    category: '기타',
    link: '',
    description: '',
  },
];

// beforeEach(() => {
//   // 각 테스트가 실행되기 전에 로컬 스토리지를 초기화합니다.
//   cy.clearLocalStorage(); // Cypress에서 제공하는 clearLocalStorage() 메서드를 사용하여 로컬 스토리지를 초기화합니다.
// });
describe('점심 뭐 먹지 E2E테스트', () => {
  const testCategoryList = ['한식', '아시안'];

  testCategoryList.forEach((targetCategory) => {
    it(`${targetCategory} 카테고리를 선택하면 해당하는 카테고리의 음식점 목록만 보여준다.`, () => {
      localStorage.setItem(
        'restaurantList',
        JSON.stringify(dummyRestaurantData)
      );

      cy.visit('http://localhost:8080/');

      cy.get('select#category-filter').select(targetCategory);

      cy.get('.restaurant-list-container')
        .find('img')
        .each((img) => {
          const category = img.attr('alt');
          expect(category).to.eq(targetCategory);
        });
    });
  });
});
