describe("점심 뭐 먹지 첫 방문시 기능 작동 테스트", () => {
  beforeEach(() => {
    cy.viewport(414, 896);
    cy.visit("http://localhost:8080/");
  });

  it("첫 방문 시 데이터를 추가한다.", () => {
    //데이터 추가
    cy.get(".gnb__button").click();

    cy.get("#category").select("한식");
    cy.get("#name").type("맛난 한식 반상");
    cy.get("#distance").select("20");
    cy.get("#description").type("여기 진짜 맛있어요");
    cy.contains("추가하기").click();

    //추가된 데이터 확인
    cy.get("#0")
      .find(".restaurant__name")
      .should("have.text", "맛난 한식 반상");
    cy.get("#0").find(".restaurant__distance").should("contain.text", "20");
    cy.get("#0")
      .find(".restaurant__description")
      .should("contain.text", "여기 진짜 맛있어요");
  });

  it("추가 한 데이터를 삭제할 수 있다.", () => {
    //데이터 추가
    cy.get(".gnb__button").click();

    cy.get("#category").select("한식");
    cy.get("#name").type("맛난 한식 반상");
    cy.get("#distance").select("20");
    cy.get("#description").type("여기 진짜 맛있어요");
    cy.contains("추가하기").click();

    //상세페이지 오픈
    cy.get(".restaurant-list").find("#0").click();

    //삭제하기 버튼 클릭
    cy.get("#delete").click();

    // 음식점이 지워졌는지 확인
    cy.get(".restaurant-list").should("not.be.visible");
  });
});

describe("점심 뭐 먹지 주요 기능 별 작동 테스트", () => {
  beforeEach(() => {
    cy.viewport(414, 896);
    cy.visit("http://localhost:8080/");

    window.localStorage.setItem(
      "restaurantList",
      '[{"category": "한식", "name": "맛난 한식 반상", "distance": "20", "description": "여기 진짜 맛있어요", "link": "", "favorite": 0, "key": 0},{"category": "중식", "name": "차이나즈", "distance": "10", "description": "짬뽕빼고 다 맛있어요", "link": "", "favorite": 0, "key": 1},{"category": "일식", "name": "카츠카츠", "distance": "5", "description": "모둠 카츠가 국룰", "link": "", "favorite": 0, "key": 3}]'
    );
  });

  it("음식점의 상세 페이지를 확인 한다.", () => {
    //상세페이지 오픈
    cy.get(".restaurant-list").find("#0").click();

    //상세페이지 데이터 확인
    cy.get("#detail_modal").should("have.class", "modal--open");
    cy.get(".detail__icon").should("have.attr", "src", "./category-korean.png");
    cy.get(".text-title").should("contain.text", "맛난 한식 반상");
    cy.get(".detail__distance").should("contain.text", "20");
    cy.get(".detail__description").should("contain.text", "여기 진짜 맛있어요");
  });

  it("음식점의 즐겨찾기를 누르면 자주 가는 음식점에서 확인 할 수 있다.", () => {
    //즐겨찾기 별 클릭
    cy.get("#0").find(".star").click();

    //자주 가는 음식점 탭으로 이동
    cy.get("#favorite_restaurant").click();

    //데이터 확인
    cy.get("#0")
      .find(".restaurant__name")
      .should("have.text", "맛난 한식 반상");
    cy.get("#0").find(".restaurant__distance").should("contain.text", "20");
    cy.get("#0")
      .find(".restaurant__description")
      .should("contain.text", "여기 진짜 맛있어요");
  });

  it("카테고리별로 확인 할 수 있다.", () => {
    //카테고리 선택
    cy.get("#category-filter").select("한식");

    //필터 된 데이터 확인
    cy.get(".restaurant-list")
      .find(".category-icon")
      .should("have.attr", "src", "./category-korean.png");
  });

  it("거리별로 정렬을 할 수 있다.", () => {
    //상세페이지 오픈
    cy.get("#sorting-filter").select("거리순");

    //첫번째 음식점이 카츠카츠인지 확인
    cy.get(".restaurant-list")
      .children()
      .first()
      .should("contain.text", "카츠카츠");
  });

  it("상세정보 창에서 즐겨찾기를 눌렀을 때 전체페이지에서 반영된다", () => {
    //상세페이지 오픈
    cy.get(".restaurant-list").find("#1").click();

    //즐겨찾기 별 클릭
    cy.get("#detail_modal").find(".star").click();

    //닫기 클릭
    cy.get("#close").click();

    //즐겨 찾기 반영됐는지 확인
    cy.get("#1")
      .find(".star")
      .should("have.attr", "src", "./favorite-icon-filled.png");
  });
});
