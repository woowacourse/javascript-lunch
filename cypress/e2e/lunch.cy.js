describe("My First Test", () => {
  it('추가 버튼을 누르고 정보를 입력한 후 "추가하기"버튼을 누르면 화면에 새로운 식당이 추가된다.', () => {
    cy.viewport(390, 880);

    cy.visit("http://localhost:8080/");

    cy.contains("점심 뭐 먹지");

    cy.get(".gnb__button").click();
    cy.get("#category").select("한식");
    cy.get("#name").type("본죽");
    cy.get("#takingTime").select("10");
    cy.get("#description").type("죽이 맛있는 식당");

    cy.get(".modal--submit").click();

    cy.contains("본죽");
  });

  it("카테고리 선택시 해당 카테고리 식당만 보여준다.", () => {
    cy.viewport(390, 880);

    cy.visit("http://localhost:8080/");

    window.localStorage.setItem(
      "restuarantList",
      JSON.stringify([
        {
          category: "한식",
          name: "피양콩할마니",
          takingTime: 10,
          description: `할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
          link: "https://naver.me/G6DyD9tg",
          id: "123",
          bookmarked: false,
        },
        {
          category: "일식",
          name: "일일일",
          takingTime: 15,
          description: `이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
          link: "https://naver.me/G6DyD9tg",
          id: "4646654",
          bookmarked: false,
        },
        {
          category: "일식",
          name: "잇쇼우",
          takingTime: 5,
          description: `잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길...`,
          link: "",
          id: "565656",
          bookmarked: false,
        },
      ])
    );

    cy.get("#category-filter").select("일식");

    cy.contains("일일일");
    cy.contains("잇쇼우");

    cy.get("#category-filter").select("한식");
    cy.contains("피양콩");
  });

  it("거리순으로 정렬 옵션 클릭시 거리순으로 정렬한다.", () => {
    cy.viewport(390, 880);

    cy.visit("http://localhost:8080/");

    window.localStorage.setItem(
      "restuarantList",
      JSON.stringify([
        {
          category: "한식",
          name: "피양콩할마니",
          takingTime: 10,
          description: `할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
          link: "https://naver.me/G6DyD9tg",
          id: "123",
          bookmarked: false,
        },
        {
          category: "일식",
          name: "일일일",
          takingTime: 15,
          description: `이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
          link: "https://naver.me/G6DyD9tg",
          id: "4646654",
          bookmarked: false,
        },
        {
          category: "일식",
          name: "잇쇼우",
          takingTime: 5,
          description: `잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길...`,
          link: "",
          id: "565656",
          bookmarked: false,
        },
      ])
    );

    cy.get("#sorting-filter").select("거리순");
    cy.get(".restaurant-list").first().contains("잇쇼우");
  });
});
