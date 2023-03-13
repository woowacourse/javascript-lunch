describe("javascript-lunch 미션 e2e 테스트", () => {
  // 초기 데이터
  const initData = [
    {
      category: "중식",
      name: "짜장면",
      distance: "10",
      description: "고급 짜장면 맛집",
      link: "https://ksone.site",
    },
    {
      category: "중식",
      name: "짬뽕",
      distance: "10",
      description: "고급 짬뽕 맛집",
      link: "https://www.naver.com",
    },
    {
      category: "일식",
      name: "초밥",
      distance: "5",
      description: "고급 초밥 맛집",
      link: "https://www.naver.com",
    },
  ];

  beforeEach(() => {
    cy.viewport(390, 880);
    // 사이트 방문
    cy.visit("http://localhost:8081");

    initData.forEach((data) => {
      // 음식점 추가 모달 열기
      cy.get(".gnb__button").click();

      // 정보 입력
      cy.get("#category").select(data.category);
      cy.get("#name").type(data.name);
      cy.get("#distance").select(data.distance, { force: true });
      cy.get("#description").type(data.description, { force: true });
      cy.get("#link").type(data.link);

      // 추가하기 버튼 클릭
      cy.get("button[type='submit']").click();
    });
  });

  it("음식점 추가 버튼을 클릭해 음식점 추가 모달을 열고, 정보를 입력하면 메인에 입력된 정보의 음식점이 추가된다.", () => {
    // 입력 값 확인
    cy.get(".category-icon")
      .first()
      .should("have.attr", "src", "./category-chinese.png");
    cy.get(".restaurant__name").first().should("have.text", "짜장면");
    cy.get(".restaurant__distance").first().should("contain.text", "10");
    cy.get(".restaurant__description")
      .first()
      .should("contain.text", "고급 짜장면 맛집");
  });

  it("즐겨찾기 버튼을 누르면 자주 가는 음식점 목록에 추가된다.", () => {
    // 즐겨찾기 등록
    cy.get(".favorite-icon").first().click();

    // 즐겨찾기 메뉴 이동
    cy.get("favorite-restaurants-menu").click();

    // 즐겨찾기 확인
    cy.get("favorite-restaurant-list")
      .find(".restaurant-list")
      .first()
      .should("be.visible");
  });

  it("음식점 삭제버튼 누르면 음식점이 삭제된다.", () => {
    // 음식점 모달 열어 삭제하기 버튼 클릭
    cy.get(".restaurant__information").first().click();
    cy.contains("삭제하기").click();

    // 음식점이 지워졌는지 확인
    cy.get(".restaurant__name").first().should("not.have.text", "짜장면");
  });

  it("음식점 상세보기 모달에서 즐겨찾기 버튼을 눌러도 자주 가는 음식점 목록에 추가된다.", () => {
    // 음식점 모달 열어 즐겨찾기 등록
    cy.get(".restaurant__information").first().click();
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
    // 새로고침
    cy.reload();

    // 입력 값 확인
    cy.get(".category-icon")
      .first()
      .should("have.attr", "src", "./category-chinese.png");
    cy.get(".restaurant__name").first().should("have.text", "짜장면");
    cy.get(".restaurant__distance").first().should("contain.text", "10");
    cy.get(".restaurant__description")
      .first()
      .should("contain.text", "고급 짜장면 맛집");
  });

  it("카테고리 필터링 잘 되는지 테스트", () => {
    // 카테고리 설정
    cy.get("#category-filter").select("일식");

    // 필터링 된 음식점의 카테고리가 일식인지 확인
    cy.get(".restaurant-list")
      .find(".category-icon")
      .should("have.attr", "src", "./category-japanese.png");
  });

  it("정렬이 잘 되는지 테스트", () => {
    // 정렬 설정
    cy.get("#sorting-filter").select("거리순");

    // 첫 번째로 온 음식점이 누가바(10분)인지 확인
    cy.get(".restaurant-list")
      .first()
      .find(".restaurant__name")
      .should("contain.text", "초밥");
  });
});
