## 프로그래밍 요구사항

- 핵심이 되는 기능이라고 생각하는 기능 플로우에 대해 E2E 테스트를 진행한다.
- 컴포넌트 단위로 구현하는 것을 고민하고 적용해본다.

## 구현할 기능 목록

- [ ] 우측 상단의 추가 버튼을 클릭하면 모달이 나와서 음식점을 추가할 수 있다.

  - [ ] 음식점의 카테고리, 이름, 거리(도보 이동 시간), 설명, 참고 링크를 입력해서 추가할 수 있다.
  - [ ] 카테고리, 거리는 셀렉트 박스, 이름/설명/참고 링크는 텍스트 인풋을 사용한다.
  - [ ] 카테고리, 이름, 거리는 입력 필수.

    - [ ] 카테고리는 "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나를 선택한다.
    - [ ] 거리는 캠퍼스로부터 도보로 걸리는 시간(분). 5, 10, 15, 20, 30 중 하나를 선택한다.

  - [ ] 설명, 참고 링크는 옵션. 입력하지 않아도 음식점을 추가할 수 있어야 한다.
  - [ ] 입력값이 잘못되었을 때 사용자에게 알려주는 방식은 자유롭게 구현한다.
    - [ ] 새로고침 시 이전에 추가한 새로운 음식점 정보는 초기화된다.

## 유저 플로우

1. 추가 버튼을 클릭한다.
2. 음식점 추가 폼을 작성한다.
3. 필수 항목을 입력하지 않은 경우 `추가하기` 버튼을 클릭할 수 없다.
4. 필수 항목을 입력했지만 유효성 검사에 걸리는 경우 경고창으로 알맞는 에러 메세지를 보여준다.
5. 유효성 검사를 통과한 경우 음식점을 리스트에 추가한다.

## 폼 유효성 검사

1. 카테고리: "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나
2. 음식점 이름: 1글자 이상 12자 이하
3. 거리: 5, 10, 15, 20, 30(분) 중 하나
4. 설명(옵션): 300자 이하
5. 참고 링크(옵션): 300자 이하

### 에러 처리

유효성 검사에 통과하지 못한 경우 경고창으로 에러 메세지를 보여준다.

---

## 리뷰어에게 궁금한 사항들

### E2E 시나리오 테스트 파일 관리 질문

E2E 테스트에 음식점 추가 폼이 잘 동작하는 지에 대한 여러 시나리오들이 있는데 E2E 테스트이다 보니깐 테스트 하나가 내용이 길어서 한 파일에 다 넣으면 가독성이 떨어지고 유지보수 하기 힘들 것 같다는 생각이 들었습니다.

이련 경우에는 파일을 나누시는 편이신가요? 아니면 한 기능에 대한 테스트 파일은 하나에만 두시는 편이신가요??

➔ 정답은 없겠지만 케빈은 어떤 방식으로 하시는 궁금합니다!

### DOM 접근 비용 관련 질문

기존 이벤트 핸들러 코드에서는 모달에 `음식점 추가 폼(DOM 앨리먼트)`이 없다면 새로 생성하고,
`음식점 추가 폼`이 있다면 DOM을 추가하지 않는 방식을 사용했었습니다.

하지만 이렇게 하면 이벤트가 발생할 때마다 `restaurant-add-form(음식점 추가 폼)`이 있는지 DOM에 접근해서 확인을 해줘야 해서 `isFirstRender`라는 상태를 생성해 모달이 열렸던 적이 있다면 폼을 생성하지 않는 방식으로 **DOM 요소에 접근하는 방식을 최소화하였는데 혹시 더 좋은 방안**이 있을까요??

- as-is(`restaurant-add-form` DOM이 있는지 체크)

```js
function handleBottomSheetToggle(event) {
  const modal = document.querySelector(".modal");

  if (event.target.closest(".restaurant-add-button")) {
    modal.showModal();

    const restaurantAddForm = document.querySelector(".restaurant-add-form");

    if (!restaurantAddForm) {
      const modalContainer = document.querySelector(".modal-container");
      const restaurantFrom = createRestaurantForm();
      modalContainer.appendChild(restaurantFrom);
    }
  }

  if (event.target.closest(".modal-backdrop")) {
    modal.close();
  }
}
```

- to-be(`isFirstRender` 상태 사용)

```js
function bottomSheetController() {
  let isFirstRender = false;

  function handleBottomSheetToggle(event) {
    const modal = document.querySelector(".modal");

    if (event.target.closest(".restaurant-add-button")) {
      modal.showModal();

      if (!isFirstRender) {
        const modalContainer = document.querySelector(".modal-container");
        const restaurantFrom = createRestaurantForm();

        modalContainer.appendChild(restaurantFrom);
        isFirstRender = true;
      }
    }

    if (event.target.closest(".modal-backdrop")) {
      modal.close();
    }
  }

  return { handleBottomSheetToggle };
}
```
