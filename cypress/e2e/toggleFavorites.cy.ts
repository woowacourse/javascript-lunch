describe("자주 가는 음식점을 추가하고 목록으로 확인할 수 있다.", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const currentFavoriteImage = (isFavorite: boolean) =>
    isFavorite
      ? "http://localhost:8080/favorite-icon-filled.png"
      : "http://localhost:8080/favorite-icon-lined.png";

  const clickFavoriteButton = (
    favoriteButton: Cypress.Chainable<JQuery<HTMLElement>>,
    isFavorites: boolean
  ) => {
    favoriteButton.should(
      "have.attr",
      "src",
      currentFavoriteImage(isFavorites)
    );
    favoriteButton.click();
    favoriteButton.should(
      "have.attr",
      "src",
      currentFavoriteImage(!isFavorites)
    );
  };

  it("사용자는 음식점 목록에서 즐겨찾기 버튼을 눌러 자주 가는 음식점을 추가할 수 있다.", () => {
    const favoriteButton = cy.get(
      "li[name=도쿄라면]>button.button--favorites>img"
    );

    clickFavoriteButton(favoriteButton, false);
  });

  it("사용자는 음식점 목록에서 활성화된 즐겨찾기 버튼을 눌러 자주 가는 음식점을 취소(비활성화)할 수 있다.", () => {
    const favoriteButton = cy.get(
      "li[name=스페인타파스]>button.button--favorites>img"
    );

    clickFavoriteButton(favoriteButton, false);
    clickFavoriteButton(favoriteButton, true);
  });

  it("사용자는 음식점 상세 모달에서 즐겨찾기 버튼을 눌러 자주 가는 음식점으로 추가할 수 있다.", () => {
    cy.get("li[name=프렌치빌").click();

    const favoriteButton = cy.get(
      "div.restaurant__detail[name=프렌치빌]>div>button>img"
    );

    clickFavoriteButton(favoriteButton, false);
  });

  it("사용자는 음식점 상세 모달에서 활성화된 즐겨찾기 버튼을 눌러 자주 가는 음식점을 취소(비활성화)할 수 있다.", () => {
    cy.get("li[name=방콕맛집").click();

    const favoriteButton = cy.get(
      "div.restaurant__detail[name=방콕맛집]>div>button>img"
    );

    clickFavoriteButton(favoriteButton, false);
    clickFavoriteButton(favoriteButton, true);
  });

  it("사용자는 자주 가는 음식점 탭을 눌러 자신이 즐겨찾기 추가한 음식점 목록을 확인할 수 있다.", () => {
    const favoriteButton = cy.get(
      "li[name=도쿄라면]>button.button--favorites>img"
    );

    clickFavoriteButton(favoriteButton, false);

    cy.get("div#tab>button").last().click();

    cy.get("ul.restaurant-list").contains("도쿄라면");
  });
});
