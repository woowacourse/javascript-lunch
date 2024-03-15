/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

describe("새 레스토랑 추가 모달 테스트", () => {
  context("모달 내 입력 폼 확인", () => {
    beforeEach(() => {
      cy.visit("http://localhost:8080/");
    });

    it("새 레스토랑 모달 창 열기", () => {
      // when
      cy.get(".gnb__button").click();

      // then
      cy.get(".modal.modal--open").should("exist");
    });

    it("새 레스토랑 모달 창 닫기 ", () => {
      // given
      cy.get(".gnb__button").click();

      // when
      cy.get("button").contains("취소하기").click();

      // then
      cy.get(".modal.modal--open").should("not.exist");
    });

    it("폼 필수 입력 확인", () => {
      // given
      cy.get(".gnb__button").click();

      // when
      cy.get("button").contains("추가하기").click();

      // then
      cy.get(".invalid_category").should(
        "have.text",
        "카테고리는 필수적으로 선택해주세요.",
      );
      cy.get(".invalid_name").should(
        "have.text",
        "레스토랑 이름은 필수적으로 작성해주세요",
      );
      cy.get(".invalid_distance").should(
        "have.text",
        "거리를 필수적으로 선택해주세요.",
      );
    });

    it("유효하지 않은 인풋값 확인 (예: 300글자 초과 설명, 유효하지 않은 링크)", () => {
      // given
      cy.get(".gnb__button").click();
      cy.get("select[id=category]").select("한식");
      cy.get("input[name=name]").type("참치 여행");
      cy.get("select[id=distance]").select("5분 내");

      // when
      cy.get("textarea[name=description]").type(
        "500자 넘는 문단 하나, 이 영역에서의 최적의 성능은 시스템 리소스와 관련이 깊게 연결되어 있습니다. 각 요소는 다른 하드웨어 구성과 상호 작용하며, 이에 따라 성능 특성이 달라집니다. 이러한 시스템에서는 고성능을 위해 여러 요소 간의 상호 작용을 최적화해야 합니다. 이는 시스템의 전반적인 안정성과 성능에 긍정적인 영향을 미칠 수 있습니다. 또한, 이러한 최적화는 사용자 경험을 향상시키는 데 중요한 역할을 합니다. 따라서 성능 향상을 위해서는 하드웨어 및 소프트웨어 간의 효율적인 조정이 필수적입니다. 이를 통해 사용자가 시스템을 보다 효과적으로 활용할 수 있으며, 다양한 작업을 보다 빠르고 효율적으로 처리할 수 있습니다.",
      );
      cy.get("input[name=link]").type("유효하지 않은 링크");
      cy.get("button").contains("추가하기").click();

      // then
      cy.get(".invalid_description").should(
        "have.text",
        "설명의 최대 글자수는 300자입니다.",
      );
      cy.get(".invalid_link").should(
        "have.text",
        "유효한 주소값을 입력해주세요.",
      );
    });

    it("유효한 값 입력 시 정상 등록 (필수값만 등록)", () => {
      // given
      cy.get(".gnb__button").click();
      cy.get("select[id=category]").select("한식");
      cy.get("select[id=category]").should("have.value", "한식");
      cy.get("input[name=name]").type("참치 여행");
      cy.get("select[id=distance]").select("5분 내");

      // when
      cy.get("button").contains("추가하기").click();

      // then
      cy.get(".modal.modal--open").should("not.exist");
      cy.contains("참치 여행").should("exist");
    });

    it("유효한 값 입력 시 정상 등록", () => {
      // given
      cy.get(".gnb__button").click();
      cy.get("select[id=category]").select("한식");
      cy.get("select[id=category]").should("have.value", "한식");
      cy.get("input[name=name]").type("참치 여행");
      cy.get("select[id=distance]").select("5분 내");
      cy.get("textarea[name=description]").type("우리집 참치 싱싱!");
      cy.get("input[name=link]").type("http://naver.com");

      // when
      cy.get("button").contains("추가하기").click();

      // then
      cy.get(".modal.modal--open").should("not.exist");
      cy.contains("참치 여행").should("exist");
      cy.contains("우리집 참치 싱싱!").should("exist");
    });
  });
});
