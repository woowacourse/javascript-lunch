describe("e2e테스트_점심 뭐 먹지", () => {
  const restaurantList = [
    {
      category: "한식",
      description: "떡갈비가 오지게 맛있는 집입니다.",
      distance: "5",
      link: "",
      name: "가정집 백반",
    },
    {
      category: "일식",
      description:
        "숙대최고 아웃풋인 텐동집입니다. 아무도 법점할 수 없는 일식집이죠.",
      distance: "10",
      link: "",
      name: "작은도쿄",
    },
    {
      category: "중식",
      description:
        "어렸을 때 자주가던 중국집입니다. 짬뽕집인데 짜장이 맛있어요.",
      distance: "15",
      link: "",
      name: "열라왕짬뽕",
    },
    {
      category: "양식",
      description:
        "양식은 역시 프랜차이즈지. 라는 생각을 하게 하는 찐맛집입니다.",
      distance: "20",
      link: "",
      name: "서가앤쿡",
    },
    {
      category: "아시안",
      description:
        "저런 음식점은 없습니다. 아시안음식 안좋아해서 맘대로 지어봤어요.",
      distance: "30",
      link: "",
      name: "어메이징 아시안",
    },
  ];

  it("모달에서 음식점 정보를 입력하고 추가하기 버튼을 눌렀을 때 음식점이 추가되는 기능테스트", () => {
    cy.viewport(1920, 970);
    cy.visit("https://naveowo.github.io/javascript-lunch/dist/index.html");

    cy.contains("열라왕짬뽕").should("not.exist");
    cy.get(".gnb__button").click();

    cy.get("#category").select("중식");
    cy.get("#name").type("열라왕짬뽕");
    cy.get("#distance").select("10");
    cy.get("#description").type("어렸을 때 많이 먹은 중국집입니다.");

    cy.get(
      ".modal-container > form > .button-container > .button--primary"
    ).click();

    cy.contains("열라왕짬뽕").should("be.visible");
  });

  it("카테고리 필터를 선택했을 때 해당 카테고리 음식이 아닐 경우 랜더링 되지 않는 기능 테스트", () => {
    cy.viewport(1920, 970);
    cy.visit("https://naveowo.github.io/javascript-lunch/dist/index.html", {
      onBeforeLoad(win) {
        restaurantList.forEach((element, idx) => {
          win.localStorage.setItem(`${idx}`, JSON.stringify(element));
        });
      },
    });

    cy.get("#category-filter").select("일식");
    cy.contains("열라왕짬뽕").should("not.exist");
  });

  it("카테고리 필터를 선택했을 때 해당 카테고리 음식일 경우 랜더링 되는 기능 테스트", () => {
    cy.viewport(1920, 970);
    cy.visit("https://naveowo.github.io/javascript-lunch/dist/index.html", {
      onBeforeLoad(win) {
        restaurantList.forEach((element, idx) => {
          win.localStorage.setItem(`${idx}`, JSON.stringify(element));
        });
      },
    });

    cy.get("#category-filter").select("일식");
    cy.contains("작은도쿄").should("be.visible");
  });

  it("이름순 정렬 필터를 선택했을 때 이름순으로 랜더링 되는 기능 테스트", () => {
    cy.viewport(1920, 970);
    cy.visit("https://naveowo.github.io/javascript-lunch/dist/index.html", {
      onBeforeLoad(win) {
        restaurantList.forEach((element, idx) => {
          win.localStorage.setItem(`${idx}`, JSON.stringify(element));
        });
      },
    });

    cy.get("#sorting-filter").select("이름순");
    cy.contains("가정집 백반").first();
    cy.contains("작은도쿄").last();
  });

  it("거리순 정렬 필터를 선택했을 때 이름순으로 랜더링 되는 기능 테스트", () => {
    cy.viewport(1920, 970);
    cy.visit("https://naveowo.github.io/javascript-lunch/dist/index.html", {
      onBeforeLoad(win) {
        restaurantList.forEach((element, idx) => {
          win.localStorage.setItem(`${idx}`, JSON.stringify(element));
        });
      },
    });

    cy.get("#sorting-filter").select("이름순");
    cy.contains("가정집 백반").first();
    cy.contains("어메이징 아시안").last();
  });

  it("즐겨찾기 아이콘을 누르고 카테고리를 변경하면 즐겨찾기한 리스트만 랜더링 되는 기능 테스트", () => {
    cy.viewport(1920, 970);
    cy.visit("https://naveowo.github.io/javascript-lunch/dist/index.html", {
      onBeforeLoad(win) {
        restaurantList.forEach((element, idx) => {
          win.localStorage.setItem(`${idx}`, JSON.stringify(element));
        });
      },
    });

    cy.get(".restaurant").contains("작은도쿄").get("#star-4").click();
    cy.get(".favorate").click();
    cy.contains("작은도쿄").should("be.visible");
  });

  it("리스트를 선택했을 때 해당 리스트 모달이 랜더링 되는 기능 테스트", () => {
    cy.viewport(1920, 970);
    cy.visit("https://naveowo.github.io/javascript-lunch/dist/index.html", {
      onBeforeLoad(win) {
        restaurantList.forEach((element, idx) => {
          win.localStorage.setItem(`${idx}`, JSON.stringify(element));
        });
      },
    });

    cy.get(".restaurant").contains("작은도쿄").click();
    cy.get(".modal").contains("작은도쿄").should("be.visible");
  });
});
