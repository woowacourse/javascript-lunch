## 프로그래밍 요구사항

- 핵심이 되는 기능이라고 생각하는 기능 플로우에 대해 E2E 테스트를 진행한다.
- 컴포넌트 단위로 구현하는 것을 고민하고 적용해본다.

## 구현할 기능 목록

- [x] 우측 상단의 추가 버튼을 클릭하면 모달이 나와서 음식점을 추가할 수 있다.

  - [x] 음식점의 카테고리, 이름, 거리(도보 이동 시간), 설명, 참고 링크를 입력해서 추가할 수 있다.
  - [x] 카테고리, 거리는 셀렉트 박스, 이름/설명/참고 링크는 텍스트 인풋을 사용한다.
  - [x] 카테고리, 이름, 거리는 입력 필수.

    - [x] 카테고리는 "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나를 선택한다.
    - [x] 거리는 캠퍼스로부터 도보로 걸리는 시간(분). 5, 10, 15, 20, 30 중 하나를 선택한다.

  - [x] 설명, 참고 링크는 옵션. 입력하지 않아도 음식점을 추가할 수 있어야 한다.
  - [x] 입력값이 잘못되었을 때 사용자에게 알려주는 방식은 자유롭게 구현한다.
    - [x] 새로고침 시 이전에 추가한 새로운 음식점 정보는 초기화된다.

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

또한, 저와 페어의 의견이 갈린 지점이 있습니다. 저는 최대한 테스트를 잘게 쪼개서 어느정도 유닛 테스트를 한뒤, 통합, e2e 테스트를 하는데요.

그런데, 만약 테스트 예산이 한정이 되어있다는하에, 만약, 최종적으로 e2e에서 모든 것을 체크한다고 하면, 기존에 있었던 통합, 유닛 테스트는 필요가 없다고 생각할수 있을까요?

cypress는 e2e 테스트를 하는, 그리고 실제로의 구현 방식도 유저가 클릭하는 것을 그대로 모방하여 매크로 처럼 동작을 하는 것 같던데, 이것 툴 자체가 유닛, 통합 테스트가 번거롭게 작용하는 것도 한몫하는 것 같구요.

쵸파의 생각이 어떤지 궁금합니다. cypress로 유닛, 통합도 하시는 편인가요?

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

## css 워터폴

동료랑 진행을 코드를 짜던 중에, main css에 컴포넌트의 css파일을 import하는 과정이 있었습니다.

전혀 생각을 안하고 있었는데, 하나하나 임포트를 하고 어느정도의 워터폴이 생기는 것이 보였습니다.

결국은 조금 코드가 의아할수 있지만, html에 css를 임포트 하는 방식으로 진행을 했습니다.

애초에 처음부터 이것이 의미가 있는 작업인지, 혹시 워터폴이 발생할수 있는지에 대한 궁금증이 존재합니다.

## 피그마에 있는 그대로 구현 하는것이 좋은가요?

동료랑 이야기를 하던 중에, 현재 구현 사항에서는 사실상 컴포넌트 분리가 우선시되고, 기능 동작, 구현 사항에는 '피그마에 있는 기본값 레스토랑 리스트(피양콩컴퍼니,친친)'같은 것을 구현하라고 적혀지지 않았다는 것을 발견했습니다.

조금, 고민과 이야기를 나누었는데, 저는 클라이언트 입장에서 보면 굉장히 당황해 할것이라고 생각해, 해당 기본값 리스트를 구현을 해두는것이 중요하다고 생각했지만, 동료의 입장으로는 해당 사항이 step2에 구현해도 늦지 않다라고 생각 하고 있더군요.

한편, 동료의 입장도 이해가 됩니다. step2에 정렬을 하게 되면, 기존에 보관했던 레스트랑 리스트의 포멧과 자료 구조를 바꿔야 할수 있으니까요.

혹시 비슷한 사례가 있으면, 이야기를 나누어 줄수 있으실까요? 그리고, 클라이언트와 개발자의 소통의 레벨에 따라서 유연하게 넘어가는 편일까요?
