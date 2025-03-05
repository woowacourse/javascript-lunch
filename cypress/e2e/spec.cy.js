describe("헤더 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("헤더에 '점심 뭐 먹지' 텍스트가 표시되는지 확인한다.", () => {
    cy.get(".text-title").should("contain", "점심 뭐 먹지");
  });
  it("헤더에 모달 버튼이 표시되는지 확인한다.", () => {
    cy.get("#gnb-button").should("exist");
  });
  it("헤더에 모달 버튼이 클릭되는지 확인한다", () => {
    cy.get("#gnb-button").click();
  });
});

describe("Body 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("Body에 레스토랑 아이콘이 표시되는지 확인한다.", () => {
    cy.get(".restaurant__category").should("exist");
  });

  it("Body에 레스토랑 title이 표시되는지 확인한다.", () => {
    cy.get(".restaurant__name").should("exist");
  });

  it("Body에 레스토랑 소요시간이 표시되는지 확인한다.", () => {
    cy.get(".restaurant__distance").should("exist");
  });

  it("Body에 레스토랑 설명이 표시되는지 확인한다.", () => {
    cy.get(".restaurant__description").should("exist");
  });
});

describe("모달 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("모달이 표시될 때 배경이 어두워지는지 확인한다.", () => {
    cy.get("#gnb-button").click();
    cy.get(".modal-backdrop").should(
      "have.css",
      "background-color",
      "rgba(0, 0, 0, 0.35)",
    );
  });

  it("모달의 제목이 새로운 음식점으로 표시되는지 확인한다.", () => {
    cy.get("#gnb-button").click();
    cy.get(".modal-title").should("have.text", "새로운 음식점");
  });

  it("카테고리(Category) Dropdown을 클릭했을 때 한식, 중식 ,일식 ,아시안 ,양식 ,기타 항목이 표시되는지 확인한다", () => {
    cy.get("#gnb-button").click();
    cy.get("select#category")
      .find("option")
      .should("contain", "한식")
      .should("contain", "중식")
      .should("contain", "일식")
      .should("contain", "아시안")
      .should("contain", "양식")
      .should("contain", "기타");
  });

  it("이름(Name)이 입력되는지 확인한다.", () => {
    cy.get("#gnb-button").click();
    cy.get("#name").type("tester").should("have.value", "tester");
  });

  it("거리(Distance) Dropdown**을 클릭했을 때 5분, 10분, 15분, 20분, 30분 항목이 표시되는지 확인한다: ", () => {
    cy.get("#gnb-button").click();
    cy.get("select#distance")
      .find("option")
      .should("contain", "5분 내")
      .should("contain", "10분 내")
      .should("contain", "15분 내")
      .should("contain", "20분 내")
      .should("contain", "30분 내");
  });

  it("설명(description)이 입력되는지 확인한다.", () => {
    cy.get("#gnb-button").click();
    cy.get("#description").type("tester").should("have.value", "tester");
  });

  it("참고 링크(link)이 입력되는지 확인한다.", () => {
    cy.get("#gnb-button").click();
    cy.get("#link").type("tester").should("have.value", "tester");
  });

  it("모달 하단에 '취소하기' 버튼 '추가하기' 버튼이 표시되는지 확인한다", () => {
    cy.get("#gnb-button").click();
    cy.get(".button--secondary").should("contain", "취소하기");
    cy.get(".button--primary").should("contain", "추가하기");
  });
});

describe("기능 테스트", () => {
  it("음식점 정보를 입력하고 추가하기를 누르면 음식점 리스트에 추가된다.", () => {
    cy.get("#gnb-button").click();
    // 카테고리. 이름, 거리를 입력
    cy.get("select#category").select("한식");
    cy.get("#name").type("tester");
    cy.get("select#distance").select("5분 내");

    // 추가하기 버튼 클릭
    cy.get(".button--primary").click();

    // 목록에 새로운 음식점 생겼는지 체크
    cy.get(".restaurant").should("contain", "tester");
  });
});
