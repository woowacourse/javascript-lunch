# 이벤트 관리에 대한 고민

## 1️. 초기 방식: 개별 eventListener 등록

- 각 버튼이나 요소마다 `addEventListener("click", handler)`를 직접 등록함.
- 문제점:
  - 요소가 많아지면 DOM에 너무 많은 리스너가 등록되어 성능에 영향을 줄 수 있음.
  - 각 리스너를 개별적으로 관리해야 하므로 코드 유지보수가 어려움.
  - 동적으로 추가되는 요소에 대해 별도의 이벤트 등록을 추가로 해야 하는 번거로움.

## 2. 두 번째 방식: `이벤트 위임`

- 공통 부모 요소에 한 번만 이벤트 리스너를 등록하고, 이벤트가 발생하면 이벤트 위임을 통해 실제 타겟 요소를 식별하여 처리함.

```ts
#bindEvents() {
  if (!this.eventBindings.length) return;

  this.eventBindings.forEach(({ action, eventType, handler }) => {
    this.$target.addEventListener(eventType, (event) => {
      if (event.target.dataset.action === action) {
        handler(event);
      }
    });
  });
}
```

- **장점:**

  - DOM에 단 한 개의 이벤트 리스너만 등록되므로 성능과 메모리 효율성이 개선됨.
  - 동적으로 추가되는 요소에도 자동으로 이벤트 처리가 적용됨.

- **문제점:**
  - **중복 리스너 등록:**
    각 이벤트 바인딩마다 별도의 리스너가 등록되어, 동일한 이벤트 타입(예: "click")의 이벤트가 여러 리스너에 의해 처리될 수 있음.
  - **단순 조건문 한계:**
    단일 조건문(`event.target.dataset.action === action`)으로 액션을 구분하는 방식은 이벤트가 발생한 실제 요소가 아닌, 하위 요소에서 발생할 경우 정확한 액션 판별이 어려움.
  - **동적 요소 처리의 어려움:**
    이벤트 위임 없이 각각의 요소에 직접 리스너를 등록하면, 동적으로 추가되는 요소에 대한 이벤트 처리가 누락될 위험이 있음.
  - **이벤트 해제 문제:**
    별도로 등록한 이벤트 리스너를 해제할 때, 각 리스너를 일일이 제거해야 하는 번거로움과 메모리 누수 위험이 존재함.

## 3. 최종 방식: EventChannel 내 그룹화 방식 및 `AbortController` 활용

```ts
bindEvents(eventBindings: EventBinding[]): void {
  // 이벤트 타입별로 그룹화
  const bindingsByType = new Map<
    string,
    { action: string; handler: (event: Event) => void }[]
  >();

  eventBindings.forEach(({ action, eventType, handler }) => {
    if (!bindingsByType.has(eventType)) {
      bindingsByType.set(eventType, []);
    }
    bindingsByType.get(eventType)!.push({ action, handler });
  });

  // 각 이벤트 타입에 대해 리스너 등록
  bindingsByType.forEach((bindings, eventType) => {
    this.$target.addEventListener(
      eventType,
      (event: Event) => {
        const target = event.target as HTMLElement;
        const actionElement = target.closest<HTMLElement>("[data-action]");
        if (!actionElement || !this.$target.contains(actionElement)) return;
        const action = actionElement.dataset.action;
        const binding = bindings.find((b) => b.action === action);
        if (binding) binding.handler.call(null, event);
      },
      { signal: this.abortController.signal }
    );
  });
}
```

### 1️⃣ 이벤트 그룹화

- **문제 인식:**  
  초기 방식에서는 각 이벤트 바인딩마다 별도의 이벤트 리스너를 등록했기 때문에, 동일한 이벤트 타입의 리스너가 중복되어 등록되는 문제가 있었음.
- **해결:**

  - 이벤트 바인딩 배열을 이벤트 타입(예: "click", "change")별로 그룹화
  - 그룹화된 객체를 사용하여 동일한 이벤트 타입에 대해 한 번의 리스너만 등록
  - 예를 들어, 아래와 같이 여러 "click" 이벤트 바인딩이 있다고 했을 때:

    ```ts
    [
      { action: "set-tab", eventType: "click", handler: handlerA },
      { action: "delete-item", eventType: "click", handler: handlerB },
    ];
    ```

    이 두 바인딩을 하나의 그룹("click" 그룹)으로 묶어, 공통 부모 요소에 "click" 리스너를 한 번 등록함.

  - 리스너 내부에서는 이벤트가 발생하면, 이벤트 타겟의 data-action 속성을 확인하여 어떤 액션이 필요한지를 결정하고, 그룹 내에서 해당 액션에 맞는 핸들러를 실행함.
  - 이로 인해, 여러 액션을 하나의 리스너 내에서 관리할 수 있으며, 코드가 깔끔해지고 유지보수가 용이해짐.

### 2️⃣ 정교한 액션 식별

- **문제 인식:**  
  초기 방식에서는 `event.target`만을 확인하여 `data-action` 값을 비교했으나, 클릭된 요소가 자식 요소일 경우 원하는 `data-action`이 포함된 상위 요소를 찾지 못할 수 있음.
- **해결:**
  - `closest("[data-action]")`를 사용하여, 클릭된 요소 또는 그 상위 요소 중 `data-action` 속성이 있는 요소를 찾아냄.
  - 이를 통해, 복잡한 DOM 구조에서도 정확하게 액션을 식별할 수 있게 됨.

### 3️⃣ AbortController 활용

- **문제 인식:**  
  기존 방식은 각 이벤트 리스너를 수동으로 관리 및 해제해야 했으며, 컴포넌트 업데이트나 DOM 제거 시 메모리 누수의 위험이 있었음.

- **해결:**
  - [AbortController](https://developer.mozilla.org/ko/docs/Web/API/AbortController)는 브라우저에서 제공하는 API로, 이벤트 리스너를 등록할 때 옵션으로 signal을 전달할 수 있음.
    ```ts
    constructor() {
        this.abortController = new AbortController();
    }
    ```
    ```ts
    this.$target.addEventListener("click", () => {}, {
      signal: this.abortController.signal,
    });
    ```
  - 이 signal을 통해, 나중에 **abort()**를 호출하면 해당 signal에 바인딩된 모든 이벤트 리스너가 한 번에 제거됨.
    ```ts
    destroy(): void {
        this.abortController.abort();
    }
    ```
  - 이를 통해, 컴포넌트가 업데이트되거나 DOM에서 제거될 때 이벤트 리스너를 일일이 제거할 필요 없이, 효율적으로 정리할 수 있음.
