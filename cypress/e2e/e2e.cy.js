describe("e2e 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("유저가 헤더의 메뉴 추가 버튼을 누르면, 모달이 열리고 식당을 입력할 수 있고 메인 화면에서 등록됨을 확인할 수 있다.", () => {
    // 해더의 메뉴 추가 버튼을 클릭한다.
    cy.get(".gnb__button").should("exist");
    cy.get(".gnb__button").click();

    // 모달이 열린다.
    cy.get(".modal.modal--open").should("exist");

    // 식당 정보를 입력한다.
    cy.get('select[name="category"]').select("chinese");
    cy.get('input[name="name"]').type("마담밍");
    cy.get('select[name="distance"]').select("10");
    cy.get('input[name="description"]').type("블루리본 짱 많은 맛집");
    cy.get('input[name="link"]').type(
      "https://map.naver.com/p/entry/place/11707122?lng=127.0502732&lat=37.5035179&placePath=%2Fhome&entry=plt&searchType=place&c=15.00,0,0,0,dh",
    );

    // 저장 버튼을 클릭한다.
    cy.get(".button.button--primary.text-caption").click();

    // 모달이 닫히고 사용자는 등록한 값을 확인할 수 있다.
    cy.get(".modal").should("not.have.class", "modal--open");
    cy.get(".restaurant__name").should("contain.text", "마담밍");
  });

  it("유저가 헤더의 메뉴 추가 버튼을 누르면, 모달이 열린 후 필수 항목에 값을 입력하지 않으면 에러 메시지를 띄운다.", () => {
    // 헤더의 메뉴 추가 버튼을 클릭한다.

    cy.get(".gnb__button").should("exist");
    cy.get(".gnb__button").click();
    cy.get(".modal.modal--open").should("exist");

    // 사용자가 필수 정보를 입력하지 않는다.
    cy.get('input[name="description"]').type("블루리본 짱 많은 맛집");
    cy.get('input[name="link"]').type(
      "https://map.naver.com/p/entry/place/11707122?lng=127.0502732&lat=37.5035179&placePath=%2Fhome&entry=plt&searchType=place&c=15.00,0,0,0,dh",
    );
    cy.get(".button.button--primary.text-caption").click();
    cy.get(".modal").should("have.class", "modal--open");
  });
});
