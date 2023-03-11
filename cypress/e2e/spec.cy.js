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
  {
    id: "3",
    category: "중식",
    name: "친친",
    distance: 5,
    description: "울면",
    isFavorite: false,
  },
];

beforeEach(() => {
  window.localStorage.setItem(localStorageId, JSON.stringify(mockRestaurants));
  cy.visit("http://localhost:8080/");
});

describe("음식점 추가 모달 테스트", () => {
  beforeEach(() => {
    cy.get(".gnb__button").click();
  });

  it("음식점 추가 버튼을 클릭하면 음식점 추가 모달이 뜬다.", () => {
    cy.get(".modal").should("have.attr", "class", "modal modal--open");
    cy.get("restaurant-add-modal").should("be.visible");
  });

  it("추가하기 버튼을 클릭하면 음식점 리스트에 추가된다.", () => {
    cy.get("#category").select("양식");
    cy.get("#name").type("맥도날드");
    cy.get("#distance").select("10");
    cy.contains("추가하기").click();
    cy.get('.restaurant[name="맥도날드"]').should("be.visible");
  });

  it("취소하기 버튼을 클릭하면 모달이 닫힌다.", () => {
    cy.contains("취소하기").click();
    cy.get(".modal").should("have.attr", "class", "modal");
  });
});

describe("음식점 즐겨찾기 테스트", () => {
  it("빈 상태의 음식점 즐겨찾기 버튼을 클릭하면 채워진 즐겨찾기 아이콘으로 바뀐다.", () => {
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

  it("채워진 상태의 음식점 즐겨찾기 버튼을 클릭하면 빈 즐겨찾기 아이콘으로 바뀐다.", () => {
    cy.get('.restaurant[name="명정루"]')
      .find('button[is="favorite-button"]')
      .click()
      .find("img")
      .should(
        "have.attr",
        "src",
        "http://localhost:8080/favorite-icon-lined.png"
      );
  });
});

describe("음식점 탭 메뉴 테스트", () => {
  it("자주 가는 음식점 탭을 클릭하면 즐겨찾기에 추가한 음식점 리스트만 보여준다.", () => {
    cy.get(".restaurant-favorite-menu").click();
    cy.get(".restaurant-list").children().should("have.length", 1);
    cy.get('.restaurant[name="명정루"]').should("be.visible");
    cy.get(".restaurant-list").should("not.contain.text", "피양콩할마니");
  });

  it("모든 음식점 탭을 클릭하면 모든 음식점 리스트를 보여준다.", () => {
    cy.get(".restaurant-favorite-menu").click();
    cy.get(".restaurant-all-menu").click();
    cy.get(".restaurant-list").children().should("have.length", 3);
  });
});

describe("음식점 상세 모달 테스트", () => {
  beforeEach(() => {
    cy.get('.restaurant[name="명정루"] .restaurant-detail-button').click();
  });

  it("음식점을 클릭하면 해당 음식점의 상세 모달이 뜬다", () => {
    cy.get(".modal").should("have.attr", "class", "modal modal--open");
    cy.get("restaurant-detail-modal")
      .should("be.visible")
      .should("contain.text", "명정루");
  });

  it("닫기 버튼을 클릭하면 모달이 닫힌다.", () => {
    cy.contains("닫기").click();
    cy.get(".modal").should("have.attr", "class", "modal");
  });

  it("삭제하기 버튼을 클릭하면 해당 음식점이 리스트에서 삭제된다.", () => {
    cy.contains("삭제하기").click();
    cy.get(".restaurant-list").should("not.contain.text", "명정루");
    cy.get(".restaurant-list").children().should("have.length", 2);
  });
});

describe("음식점 카테고리 필터링 테스트", () => {
  it("중식 카테고리 옵션을 클릭하면 중식 음식점만 보여준다.", () => {
    cy.get("#category-filter").select("중식");
    cy.get(".restaurant-list")
      .children()
      .find("img")
      .should("have.attr", "src", "http://localhost:8080/category-chinese.png");
  });
});

describe("음식점 정렬 테스트", () => {
  it("거리순으로 정렬하면 거리순 기준 오름차순으로 정렬하여 보여준다.", () => {
    cy.get("#sorting-filter").select("거리순");
    ["친친", "피양콩할마니", "명정루"].forEach((name, index) => {
      cy.get('li[is="restaurant-card"]')
        .eq(index)
        .should("contains.text", name);
    });
  });
});
