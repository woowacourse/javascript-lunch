describe("E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("성공 시나리오: 모든 필수 필드 입력 후 모달 닫힘", () => {
    // 모달 열기
    cy.get(".gnb__button").should("exist").click();
    cy.get(".modal.modal--open").should("exist");

    // 드롭다운과 입력 필드에 값 입력
    cy.get("#category select.option").should("be.visible").select("중식");
    cy.get('input[name="name"]').should("be.visible").type("마담밍");
    cy.get("#distance select.option").should("be.visible").select("10");
    cy.get('input[name="description"]')
      .should("be.visible")
      .type("블루리본 짱 많은 맛집");
    cy.get('input[name="link"]')
      .should("be.visible")
      .type(
        "https://map.naver.com/p/entry/place/11707122?lng=127.0502732&lat=37.5035179&placePath=%2Fhome&entry=plt&searchType=place&c=15.00,0,0,0,dh",
      );

    // 제출 후 모달이 닫히고, 레스토랑 이름이 올바르게 표시되는지 확인
    cy.get(".button.button--primary.text-caption").should("be.visible").click();
    cy.get(".modal").should("not.have.class", "modal--open");
    cy.get(".restaurant__name").should("contain.text", "마담밍");
  });

  it("성공 시나리오: 좋아요 클릭 후 자주가는 음식점 클릭 시 해당 식당 랜더링", () => {
    const targetName = "피양콩할마니";
    cy.contains(".restaurant__name", targetName)
      .parents(".restaurant")
      .find(".list__star")
      .click();
    // 로컬 업데이트 확인
    cy.window().then((win) => {
      const value = win.localStorage.getItem("restaurantData");
      const parsedValue = JSON.parse(value);
      const targetRestaurant = parsedValue.find(
        (restaurant) => restaurant.name.trim() === targetName,
      );
      expect(targetRestaurant.like).to.be.true;
    });
    // 탭 바 이동 후 랜더링 확인
    cy.get(".favorite").click();
    cy.get(".restaurant").should("have.length", 1);
    cy.get(".restaurant__name").should("contain.text", targetName);
  });

  it("실패 시나리오: 필수 필드 누락 시 모달 유지", () => {
    // 모달 열기
    cy.get(".gnb__button").should("exist").click();
    cy.get(".modal.modal--open").should("exist");

    // 일부 필드만 입력 (예: 카테고리, 이름, 거리 입력 안 함)
    cy.get('input[name="description"]')
      .should("be.visible")
      .type("블루리본 짱 많은 맛집");
    cy.get('input[name="link"]')
      .should("be.visible")
      .type(
        "https://map.naver.com/p/entry/place/11707122?lng=127.0502732&lat=37.5035179&placePath=%2Fhome&entry=plt&searchType=place&c=15.00,0,0,0,dh",
      );

    // 제출 시 모달이 닫히지 않아야 함
    cy.get(".button.button--primary.text-caption").should("be.visible").click();
    cy.get(".modal").should("have.class", "modal--open");
  });
});
