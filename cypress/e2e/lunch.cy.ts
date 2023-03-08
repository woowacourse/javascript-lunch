describe("javascript-lunch 미션 e2e 테스트", () => {
  it("음식점 추가 버튼을 클릭해 음식점 추가 모달을 열고, 정보를 입력하면 메인에 입력된 정보의 음식점이 추가된다.", () => {
    cy.viewport(390, 880);
    // 사이트 방문
    cy.visit("http://localhost:8081");

    // 음식점 추가 모달 열기
    cy.get(".gnb__button").click();

    // 정보 입력
    cy.get("#category").select("한식");
    cy.get("#name").type("무쇠 삼겹살");
    cy.get("#distance").select("10", { force: true });
    cy.get("#description").type("한국 50년 전통 무쇠 삼겹살", { force: true });
    cy.get("#link").type("http://ksone.site");

    // 추가하기 버튼 클릭
    cy.get("button[type='submit']").click();

    // 입력 값 확인
    cy.get(".category-icon").should(
      "have.attr",
      "src",
      "./category-korean.png"
    );
    cy.get(".restaurant__name").should("have.text", "무쇠 삼겹살");
    cy.get(".restaurant__distance").should("contain.text", "10");
    cy.get(".restaurant__description").should(
      "contain.text",
      "한국 50년 전통 무쇠 삼겹살"
    );
  });

  it("즐겨찾기 버튼을 누르면 자주 가는 음식점 목록에 추가된다.", () => {
    cy.viewport(390, 880);
    // 사이트 방문
    cy.visit("http://localhost:8081");

    // 초기 테이터 설정
    window.localStorage.setItem(
      "restaurantList",
      '[{"category":"중식","name":"짜장면","distance":"10","description":"고급 짜장면 맛집","link":"https://www.naver.com","isFavorite":false,"id":0}]'
    );

    // 즐겨찾기 등록
    cy.get(".favorite-icon").click();

    // 즐겨찾기 메뉴 이동
    cy.get("favorite-restaurants-menu").click();

    // 즐겨찾기 확인
    cy.get("favorite-restaurant-list")
      .find(".restaurant-list")
      .first()
      .should("be.visible");
  });

  it("음식점 삭제버튼 누르면 음식점이 삭제된다.", () => {
    cy.viewport(390, 880);
    // 사이트 방문
    cy.visit("http://localhost:8081");

    // 초기 데이터 설정
    window.localStorage.setItem(
      "restaurantList",
      '[{"category":"중식","name":"짜장면","distance":"10","description":"고급 짜장면 맛집","link":"https://www.naver.com","isFavorite":false,"id":0}]'
    );

    // 음식점 모달 열어 삭제하기 버튼 클릭
    cy.get(".restaurant__information").click();
    cy.contains("삭제하기").click();

    // 음식점이 지워졌는지 확인
    cy.get(".restaurant-list").should("not.be.visible");
  });

  it("음식점 상세보기 모달에서 즐겨찾기 버튼을 눌러도 자주 가는 음식점 목록에 추가된다.", () => {
    cy.viewport(390, 880);
    // 사이트 방문
    cy.visit("http://localhost:8081");

    // 초기 테이터 설정
    window.localStorage.setItem(
      "restaurantList",
      '[{"category":"중식","name":"짜장면","distance":"10","description":"고급 짜장면 맛집","link":"https://www.naver.com","isFavorite":false,"id":0}]'
    );

    // 음식점 모달 열어 즐겨찾기 등록
    cy.get(".restaurant__information").click();
    cy.get(".modal-container").find(".favorite-icon").click();
    cy.contains("닫기").click();

    // 즐겨찾기 메뉴 이동
    cy.get("favorite-restaurants-menu").click();

    // 즐겨찾기 확인
    cy.get("favorite-restaurant-list")
      .find(".restaurant-list")
      .first()
      .should("be.visible");
  });

  it("새로고침 해도 정보가 유지된다.", () => {
    cy.viewport(390, 880);
    // 사이트 방문
    cy.visit("http://localhost:8081");

    // 음식점 추가 모달 열기
    cy.get(".gnb__button").click();

    // 정보 입력
    cy.get("#category").select("한식");
    cy.get("#name").type("무쇠 삼겹살");
    cy.get("#distance").select("10", { force: true });
    cy.get("#description").type("한국 50년 전통 무쇠 삼겹살", { force: true });
    cy.get("#link").type("http://ksone.site");

    // 추가하기 버튼 클릭
    cy.get("button[type='submit']").click();

    // 새로고침
    cy.reload();

    // 입력 값 확인
    cy.get(".category-icon").should(
      "have.attr",
      "src",
      "./category-korean.png"
    );
    cy.get(".restaurant__name").should("have.text", "무쇠 삼겹살");
    cy.get(".restaurant__distance").should("contain.text", "10");
    cy.get(".restaurant__description").should(
      "contain.text",
      "한국 50년 전통 무쇠 삼겹살"
    );
  });

  it("카테고리 필터링 잘 되는지 테스트", () => {
    cy.viewport(390, 880);
    // 사이트 방문
    cy.visit("http://localhost:8081");

    // 초기 테이터 설정
    window.localStorage.setItem(
      "restaurantList",
      '[{"category":"중식","name":"짜장면","distance":"10","description":"고급 짜장면 맛집","link":"https://www.naver.com","isFavorite":false,"id":0},{"category":"중식","name":"짬뽕","distance":"10","description":"고급 짬뽕 맛집","link":"https://www.naver.com","isFavorite":false,"id":1},{"category":"일식","name":"초밥","distance":"10","description":"고급 초밥 맛집","link":"https://www.naver.com","isFavorite":false,"id":2}]'
    );

    // 카테고리 설정
    cy.get("#category-filter").select("일식");

    // 필터링 된 음식점의 카테고리가 일식인지 확인
    cy.get(".restaurant-list")
      .find(".category-icon")
      .should("have.attr", "src", "./category-japanese.png");
  });

  it("정렬이 잘 되는지 테스트", () => {
    cy.viewport(390, 880);
    // 사이트 방문
    cy.visit("http://localhost:8081");

    // 초기 테이터 설정
    window.localStorage.setItem(
      "restaurantList",
      '[{"category":"한식","name":"김밥","distance":"30","description":"기본적인 김밥","link":"https://www.naver.com","isFavorite":false,"id":0},{"category":"한식","name":"누가바","distance":"10","description":"아이스크림","link":"https://www.naver.com","isFavorite":false,"id":1},{"category":"한식","name":"가래떡","distance":"20","description":"11월 11일은 가래떡데이","link":"https://www.naver.com","isFavorite":false,"id":2}]'
    );

    // 정렬 설정
    cy.get("#sorting-filter").select("거리순");

    // 첫 번째로 온 음식점이 누가바(10분)인지 확인
    cy.get(".restaurant-list")
      .first()
      .find(".restaurant__name")
      .should("contain.text", "누가바");
  });
});
