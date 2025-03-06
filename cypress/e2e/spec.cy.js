import { RestaurantData } from "../../src/RestaurantData.js";

describe("헤더 컴포넌트 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("헤더가 렌더링 된다.", () => {
    cy.get(".gnb").should("exist");
  });
  it("헤더의 타이틀이 렌더링 된다.", () => {
    cy.get(".gnb__title").should("exist");
    cy.get(".gnb__title").contains("점심 뭐 먹지");
  });
  it("헤더의 버튼이 렌더링 된다.", () => {
    cy.get(".gnb__button").should("exist");
  });
});

describe("레스트랑 목록 컴포넌트 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("레스토랑이 랜더링 된다.", () => {
    cy.get(".restaurant__category").should("exist");
  });
  it("레스토랑 갯수만큼 랜더링 된다.", () => {
    const length = RestaurantData.length;
    cy.get(".restaurant__category").should("have.length", length);
  });
});

describe("모달 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("메뉴추가 버튼을 눌렀을 때 모달이 정상적으로 뜬다.", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal.modal--open").should("exist");
  });
  it("취소하기 버튼을 눌렀을 때 모달이 정상적으로 닫힌다.", () => {
    cy.get(".gnb__button").click();
    cy.get(".button.button--secondary.text-caption").click();
    cy.get(".modal").should("be.hidden");
  });
});

describe("e2e 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("e2e 성공사례 테스트", () => {
    cy.get(".gnb__button").should("exist");
    cy.get(".gnb__button").click();
    cy.get(".modal.modal--open").should("exist");
    cy.get('select[name="category"]').select("chinese");
    cy.get('input[name="name"]').type("마담밍");
    cy.get('select[name="distance"]').select("10");
    cy.get('input[name="description"]').type("블루리본 짱 많은 맛집");
    cy.get('input[name="link"]').type(
      "https://map.naver.com/p/entry/place/11707122?lng=127.0502732&lat=37.5035179&placePath=%2Fhome&entry=plt&searchType=place&c=15.00,0,0,0,dh",
    );
    cy.get(".button.button--primary.text-caption").click();
    cy.get(".modal").should("not.have.class", "modal--open");
    cy.get(".restaurant__name").should("contain.text", "마담밍");
  });
  it("e2e 실패사례 테스트", () => {
    cy.get(".gnb__button").should("exist");
    cy.get(".gnb__button").click();
    cy.get(".modal.modal--open").should("exist");
    cy.get('input[name="description"]').type("블루리본 짱 많은 맛집");
    cy.get('input[name="link"]').type(
      "https://map.naver.com/p/entry/place/11707122?lng=127.0502732&lat=37.5035179&placePath=%2Fhome&entry=plt&searchType=place&c=15.00,0,0,0,dh",
    );
    cy.get(".button.button--primary.text-caption").click();
    cy.get(".modal").should("have.class", "modal--open");
  });
});
