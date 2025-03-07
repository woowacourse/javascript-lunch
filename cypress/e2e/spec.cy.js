describe("e2e 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  describe("헤더 컴포넌트 테스트", () => {
    it("헤더 정상 생성", () => {
      cy.get(".gnb")
        .children()
        .get("h1")
        .should("exist")
        .and("have.class", "gnb__title", "text-title")
        .and("have.text", "점심 뭐 먹지");
  
      cy.get(".gnb")
        .get(".gnb__button")
        .should("exist")
        .get("img")
        .should("exist");
    });
  });
  
  describe("모달 기능 테스트", () => {
    it("음식점 추가 버튼 클릭 시 모달 뜨는지 검사", () => {
      // 음식점 추가 버튼 클릭 시 모달 활성화 여부
      cy.get(".modal").should("not.have.class", "modal--open");
      cy.get(".gnb__button").click();
      cy.get(".modal").should("have.class", "modal--open");
  
      // 배경 클릭시 모달 닫히는지 여부
      cy.get(".modal-backdrop").click({ force: true });
      cy.get(".modal").should("not.have.class", "modal--open");
  
      // esc 눌렀을 시 모달 닫히는지 여부
      cy.get("body").type("{esc}");
      cy.get(".modal").should("not.have.class", "modal--open");
  
      // 취소 버튼을 눌렀을 시 모달 닫히는지 여부
      cy.get(".cancel-button").click({ force: true });
      cy.get(".modal").should("not.have.class", "modal--open");
    });
  });

  describe("음식점 추가 - 유효성 검사 테스트", () => {
    beforeEach(() => {
      cy.get(".gnb__button").click(); // 음식점 추가 모달 열기
    });
  
    it("카테고리를 선택하지 않으면 추가할 수 없다", () => {
      cy.get("#name").type("새로운 음식점");
      cy.get("#distance").select("10");
  
      cy.get(".button--primary").click();
      cy.get(".modal").should("have.class", "modal--open");
  
      cy.on("window:alert", (message) => {
        expect(message).to.equal("카테고리(은)는 필수 값입니다.");
      });
    });
  
    it("이름을 입력하지 않으면 추가할 수 없다", () => {
      cy.get("#category").select("한식");
      cy.get("#distance").select("10");
  
      cy.get(".button--primary").click();
      cy.get(".modal").should("have.class", "modal--open");
  
      cy.on("window:alert", (message) => {
        expect(message).to.equal("이름(은)는 필수 값입니다.");
      });
    });
  
    it("이름을 공백만 입력하면 추가할 수 없다", () => {
      cy.get("#category").select("한식");
      cy.get("#name").type("  ");
      cy.get("#distance").select("10");
  
      cy.get(".button--primary").click();
      cy.get(".modal").should("have.class", "modal--open");
  
      cy.on("window:alert", (message) => {
        expect(message).to.equal("이름(은)는 필수 값입니다.");
      });
    });
  
    it("거리를 선택하지 않으면 추가할 수 없다", () => {
      cy.get("#category").select("한식");
      cy.get("#name").type("새로운 음식점");
  
      cy.get(".button--primary").click();
      cy.get(".modal").should("have.class", "modal--open");
  
      cy.on("window:alert", (message) => {
        expect(message).to.equal("거리(도보 이동 시간)(은)는 필수 값입니다.");
      });
    });
  });

  describe("음식점 추가 - 데이터 입력 및 저장", () => {
    beforeEach(() => {
      cy.get(".gnb__button").click(); // 음식점 추가 모달 열기
    });
  
    it("입력한 정보가 추가 버튼 클릭 후 목록에 반영되는지 확인", () => {
      cy.get("#category").select("한식"); // 카테고리 선택
      cy.get("#name").type("김찌"); // 이름 입력
      cy.get("#distance").select("10"); // 거리 선택
      cy.get("#description").type("맛맛맛있는 김치찌개"); // 설명 입력
      cy.get("#link").type("https://example.com"); // 링크 입력
  
      cy.get(".button--primary").click({ force:true }); // 추가 버튼 클릭
      cy.get(".modal").should("not.have.class", "modal--open");
  
      // 목록에 추가된 음식점이 있는지 확인
      cy.get(".restaurant-list").within(() => {
        cy.get("img")
          .should("exist")
          .should("have.attr", "src")
          .and("include", "category-korean.png");
  
        cy.contains(".restaurant__name", "김찌").should("exist"); // 음식점 이름 확인
        cy.contains(".restaurant__distance", "캠퍼스부터 10분 내").should(
          "exist"
        );
        cy.contains(".restaurant__description", "맛맛맛있는 김치찌개").should(
          "exist"
        );
      });
    });
  });
});