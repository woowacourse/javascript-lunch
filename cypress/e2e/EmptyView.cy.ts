import restaurantListMock from '@/mock/restaurantList.mock';

describe('EmptyView 동작 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('처음 렌더링 될 때 EmptyView가 보인다.', () => {
    cy.get('empty-view').should('be.visible');
  });

  it('emptyView에서 기본 데이터 추가 버튼, 직접 추가 버튼이 보인다.', () => {
    const $buttonBox = cy.get('.button-box');
    $buttonBox.should('contains.text', '기본 데이터 추가하기');
    $buttonBox.should('contains.text', '직접 추가하기');
  });

  it('emptyView에서 기본 데이터 추가을 누르면 mock데이터가 렌더링된다.', () => {
    const $mockButton = cy.get('#mock-add-button');
    $mockButton.click();

    const mockData = restaurantListMock.sort((a, b) => a.name.localeCompare(b.name));

    cy.get('restaurant-item').each(($restaurant, index) => {
      const restaurantName = $restaurant.find('.restaurant__name').text();
      expect(restaurantName).to.equal(mockData[index].name);
    });
  });

  it('emptyView에서 기본 데이터 추가을 누르면 addModal이 뜬다.', () => {
    const $addButton = cy.get('#direct-add-button');
    $addButton.click();

    cy.get('#add-modal').should('have.class', 'modal--open');
  });
});
