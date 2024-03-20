import { STORAGE_KEY } from '../../src/constants';

describe('음식점 정보 모달 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });
  it('리스트 속 음식점을 클릭하면, 해당 음식점에 대한 정보가 담긴 모달을 화면에 띄운다', () => {
    cy.get('restaurant-item').first().click();

    cy.get('restaurant-info-modal-inner').should('be.visible');
  });

  it('음식점에 대한 정보가 담긴 모달에는 음식점에 대한 필수 정보(이름,거리,카테고리,즐겨찾기 여부)가 담겨있다', () => {
    //모달 열기
    cy.get('restaurant-item').first().click();

    const $infoModal = cy.get('restaurant-info-modal-inner');

    $infoModal.get('category-icon').should('be.visible');
    $infoModal.get('restaurant-name').should('be.visible');
    $infoModal.get('restaurant-distance').should('be.visible');
    $infoModal.get('favorite-icon').should('be.visible');
  });

  it('음식점 상세 정보 모달에서 닫기 버튼을 클릭하면 모달이 닫힌다.', () => {
    // 모달 열기
    cy.get('restaurant-item').first().click();

    const $infoModal = cy.get('restaurant-info-modal-inner');
    const $closeBtn = $infoModal.get('#btn-close-info-modal');

    $closeBtn.should('be.visible');

    $closeBtn.click();

    cy.get('restaurant-info-modal-inner').should('not.exist');
  });

  it('음식점 상세 정보 모달내에 음식점 링크가 있을 시, 새로은 브라우저 탭에 해당 링크로 연결된 인터넷 페이지가 열림다.', () => {
    cy.get('restaurant-item').first().click();

    cy.get('restaurant-info-modal-inner')
      .find('.restaurant__info__link')
      .find('a[target="_blank"]')
      .should('exist');
  });

  it('음식점 상세 정보 모달에서 삭제 버튼을 클릭하면 해당 음식점이 데이터에서 삭제되고 모달이 닫힌다.', () => {
    const $restaurantItem = cy.get('restaurant-item').first();
    const storeName = $restaurantItem.invoke('attr', 'store-name');
    //모달 열기
    cy.get('restaurant-item').first().click();

    const $infoModal = cy.get('restaurant-info-modal-inner');
    const $deleteBtn = $infoModal.get('#btn-delete-store');

    $deleteBtn.should('be.visible');
    //삭제 버튼 클릭
    $deleteBtn.click();

    // 로컬 스토리지에서 삭제 여부 확인
    cy.window().then((win) => {
      const data = win.localStorage.getItem(STORAGE_KEY.restaurants);

      if (data) {
        const list = JSON.parse(data);
        expect(list.find((store) => store.name === storeName)).to.be.undefined;
      }
    });
    // 화면상에서 삭제 여부 확인
    cy.get('restaurant-item')
      .invoke('attr', 'store-name')
      .then((hrefValue) => {
        expect(hrefValue !== storeName).to.be.true;
      });
  });
});
