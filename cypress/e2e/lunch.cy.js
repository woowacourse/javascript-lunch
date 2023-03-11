const localStorageId = "eat-for-lunch";

const mockRestaurants = [
  {
    id: "1",
    category: "한식",
    name: "피양콩할마니",
    distance: 10,
    description: "평양 출신 할머니",
    link: "https://naver.me/G6DyD9tg",
    isFavorite: false,
  },
  {
    id: "2",
    category: "중식",
    name: "명정루",
    distance: 15,
    description: "처음 방문한 곳",
    isFavorite: true,
  },
];

beforeEach(() => {
  window.localStorage.setItem(localStorageId, JSON.stringify(mockRestaurants));
  cy.visit("http://localhost:8080/");
});

describe("음식점 추가 모달 테스트", () => {
  it("음식점 추가 버튼을 클릭하면 음식점 추가 모달이 뜬다.", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal").should("have.attr", "class", "modal modal--open");
    cy.get("restaurant-add-modal").should("be.visible");
  });

  it("음식점 추가 기능 구현 테스트", () => {
    cy.get(".gnb__button").click();
    cy.get("#category").select("중식");
    cy.get("#name").type("친친");
    cy.get("#distance").select("10");
    cy.get("form").submit();
    cy.get('.restaurant[name="친친"]').should("be.visible");
  });
});

describe("음식점 즐겨찾기 테스트", () => {
  it("음식점 즐겨찾기 버튼을 클릭하면 즐겨찾기 아이콘이 바뀐다.", () => {
    cy.get('.restaurant[name="피양콩할마니"]')
      .find('button[is="favorite-button"]')
      .click()
      .find("img")
      .should(
        "have.attr",
        "src",
        "http://localhost:8080/favorite-icon-filled.png"
      );
  });
});
