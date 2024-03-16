describe('즐겨찾기 버튼 작동 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('메인 페이지에서 음식점의 즐겨찾기 버튼을 누르면 별의 색이 변하고 isFavorite 속성이 바뀐다.', () => {});
  it('디테일 페이지에서 음식점의 즐겨찾기 버튼을 누르면 별의 색이 변하고 isFavorite 속성이 바뀐다.', () => {});
  it('디테일 페이지에서 음식점의 즐겨찾기 버튼을 누르면 메인 페이지의 별도 바뀐다.', () => {});
  it('자주 가는 음식점에서 즐겨찾기를 해제하면 해당 음식점은 리스트에서 사라진다.');
});
