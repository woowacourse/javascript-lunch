describe("AddLunchModal 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.viewport(1920, 975);
    cy.get(".gnb__button").click();
  });

  it("아이콘 버튼을 클릭하면 모달이 열린다", () => {
    cy.get(".modal-container").should("be.visible");
  });

  it("취소하기 버튼을 클릭하면 모달이 닫힌다", () => {
    cy.get("#cancel__button").click();
    cy.get(".modal-container").should("not.be.visible");
  });

  it("esc를 누르면 모달이 닫힌다", () => {
    cy.get("body").type("{esc}");
    cy.get(".modal-container").should("not.be.visible");
  });

  it("모달 바깥 backdrop을 누르면 모달이 닫힌다", () => {
    cy.get(".modal[id=addLunch] .modal-backdrop").click({ force: true });
    cy.get(".modal-container").should("not.be.visible");
  });

  it("모달창을 띄우면 카테고리/이름/거리/설명/링크 입력 컴포넌트가 보인다.", () => {
    cy.get(".modal select[id='category']").should("be.visible");
    cy.get(".modal input[id='name']").should("be.visible");
    cy.get(".modal select[id='distance']").should("be.visible");
    cy.get(".modal textarea[id='description']").should("be.visible");
    cy.get(".modal input[id='link']").should("be.visible");
  });

  it("모달창을 띄우면 취소/추가 버튼이 보인다.", () => {
    cy.get("#cancel__button").should("be.visible");
    cy.get("#add__button").should("be.visible");
  });

  it("카테고리 선택/거리 드롭다운에 올바른 옵션이 있는지 확인한다.", () => {
    cy.get(".modal select[id='category'] option").then((options) => {
      const optionTexts = [...options].map((option) => option.textContent);

      expect(optionTexts).to.deep.equal([
        "선택해 주세요",
        "한식",
        "중식",
        "일식",
        "양식",
        "아시안",
        "기타",
      ]);
    });

    cy.get(".modal select[id='category']")
      .select("한식")
      .should("have.value", "한식");
  });

  it("거리 드롭다운에 올바른 옵션이 있는지 확인한다.", () => {
    cy.get(".modal select[id='distance'] option").then((options) => {
      const optionTexts = [...options].map((option) => option.textContent);

      expect(optionTexts).to.deep.equal([
        "선택해 주세요",
        "5분 내",
        "10분 내",
        "15분 내",
        "20분 내",
        "30분 내",
      ]);
    });

    cy.get(".modal select[id='distance']")
      .select("5분 내")
      .should("have.value", "5");
  });

  it("이름, 설명, 참고링크에 값을 입력할 수 있다.", () => {
    cy.get(".modal input[id='name']").type("준").should("have.value", "준");
    cy.get(".modal textarea[id='description']")
      .type("크론")
      .should("have.value", "크론");
    cy.get(".modal input[id='link']").type("공원").should("have.value", "공원");
  });

  it("카테고리 선택이 필수이다.", () => {
    cy.get(".modal select[id='distance']").select("5분 내");
    cy.get(".modal input[id='name']").type("수이");
    cy.get("#add__button").click();
    cy.get(".modal-container").should("be.visible");
  });

  it("거리 선택이 필수이다.", () => {
    cy.get(".modal select[id='category']").select("한식");
    cy.get(".modal input[id='name']").type("밍고");
    cy.get("#add__button").click();
    cy.get(".modal-container").should("be.visible");
  });

  it("이름 입력이 필수이다.", () => {
    cy.get(".modal select[id='category']").select("한식");
    cy.get(".modal select[id='distance']").select("5분 내");
    cy.get("#add__button").click();
    cy.get(".modal-container").should("be.visible");
  });

  it("모든 필수 요소를 입력하면 정상적으로 제출된 뒤, 값은 초기화된다.", () => {
    cy.get(".modal select[id='distance']").select("5분 내");
    cy.get(".modal select[id='category']").select("한식");
    cy.get(".modal input[id='name']").type("공원💖");
    cy.get("#add__button").click();
    cy.get(".modal-container").should("not.be.visible");
    cy.get(".modal select[id='distance']").should("have.value", "");
    cy.get(".modal select[id='category']").should("have.value", "");
    cy.get(".modal input[id='name']").should("have.value", "");
  });
});
