describe("음식점 추가가 잘 되는지 확인하는 시나리오", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.wait(2000);
  });

  it("모달 열기 닫기 테스트, 음식점 추가(카테고리, 이름, 거리 입력)", () => {
    // 모달 띄우기
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    // 모달 닫기
    cy.get(".cancel-button").click();
    cy.get(".modal").should("not.be.visible");

    // 모달 띄우기
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    // 폼 데이터 입력
    cy.get("#category").select("중식");
    cy.get("#name").type("마담밍");
    cy.get("#distance").select("20");

    // 폼 제출
    cy.get(".restaurant-add-form").submit();
    cy.get(".restaurant").should("have.length", 11);

    cy.get(".toast")
      .should("be.visible")
      .should("contain", "마담밍 음식점을 추가했습니다.");
  });

  it("모달 열기 테스트, 음식점 추가 2개", () => {
    // 모달 띄우기
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    // 폼 데이터 입력
    cy.get("#category").select("양식");
    cy.get("#name").type("타코집");
    cy.get("#distance").select("10");

    // 폼 제출
    cy.get(".restaurant-add-form").submit();
    cy.get(".restaurant").should("have.length", 11);

    // 모달 띄우기
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    // 폼 데이터 입력
    cy.get("#category").select("일식");
    cy.get("#name").type("잇쇼이");
    cy.get("#distance").select("15");

    // 폼 제출
    cy.get(".restaurant-add-form").submit();

    cy.get(".restaurant").should("have.length", 12);
    cy.get(".toast")
      .should("be.visible")
      .should("contain", "잇쇼이 음식점을 추가했습니다.");
  });
  it("모달 열기 테스트, 음식점 추가 2개를 했을때, 자주 찾는 음식점이 토글 되어있으면, 음식점 리스트에 보이지 않아야 함.", () => {
    cy.get('[for="filter-favorite"]').click();
    // 모달 띄우기
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    // 폼 데이터 입력
    cy.get("#category").select("양식");
    cy.get("#name").type("타코집");
    cy.get("#distance").select("10");

    // 폼 제출
    cy.get(".restaurant-add-form").submit();
    cy.get(".restaurant").should("have.length", 0);

    // 모달 띄우기
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    // 폼 데이터 입력
    cy.get("#category").select("일식");
    cy.get("#name").type("잇쇼이");
    cy.get("#distance").select("15");

    // 폼 제출
    cy.get(".restaurant-add-form").submit();

    cy.get(".restaurant").should("have.length", 0);
    cy.get(".toast")
      .should("be.visible")
      .should("contain", "잇쇼이 음식점을 추가했습니다.");
  });
});
