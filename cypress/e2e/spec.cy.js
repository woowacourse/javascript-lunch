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

/*
- [ ]모달이 표시될 때 **배경이 어두워지는지 확인한다**.
- [ ]모달의 제목이 **'새로운 음식점'**으로 표시되는지 확인한다.
- [ ]**카테고리(Category) Dropdown**을 클릭했을 때 다음 항목이 표시되는지 확인한다:
  - 한식, 중식 ,일식 ,아시안 ,양식 ,기타
- [ ]**이름(Name) 입력 텍스트 박스**가 표시되는지 확인한다.
- [ ]**거리(Distance) Dropdown**을 클릭했을 때 다음 항목이 표시되는지 확인한다:
  - 5분, 10분, 15분, 20분, 30분
- [ ]**설명(Description) 입력 텍스트 박스**가 표시되는지 확인한다.
- [ ]**참고 링크(Reference Link) 입력 텍스트 박스**가 표시되는지 확인한다.
- [ ]모달 하단에 다음 버튼이 표시되는지 확인한다:
  - **'취소하기' 버튼**
  - **'추가하기' 버튼**
*/
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
});

describe("기능 테스트", () => {
  it("음식점 정보를 입력하고 추가하기를 누르면 음식점 리스트에 추가된다.", () => {});
});
