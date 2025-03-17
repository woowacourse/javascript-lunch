# Component 사용법

## 📌 1. 개요

**Component** 클래스는 웹 UI 컴포넌트를 구축하기 위한 추상 기본 클래스입니다.  
상태 관리, 이벤트 바인딩, 렌더링, 라이프사이클 관리 등 공통 기능을 제공하며, 이를 통해 일관되고 재사용 가능한 컴포넌트를 만들 수 있습니다. 내부적으로는 두 개의 헬퍼 모듈을 사용합니다:

- **StateStore**: 컴포넌트의 상태를 관리하고, 상태 변경에 따라 등록된 콜백을 실행하여 반응형 업데이트를 지원합니다.
- **EventChannel**: AbortController를 활용하여 이벤트 바인딩과 해제를 관리하며, 지정된 타겟 요소에 이벤트를 효과적으로 연결합니다.

## 📌 2. 클래스 구성

### 2.1. 생성자 (Constructor)

```ts
constructor($target: HTMLElement, props?: Props)
```

- 매개변수:
  - **$target**: 컴포넌트가 렌더링될 DOM 요소입니다.
  - **props**: 컴포넌트에 전달할 선택적 속성 객체입니다.
- 동작:
  - 타겟 요소와 속성을 저장합니다.
  - 빈 상태 객체를 가진 **StateStore 인스턴스**를 생성합니다. (초기 상태는 하위 클래스의 **setup()**에서 설정)
  - 타겟 요소를 대상으로 이벤트를 관리할 **EventChannel 인스턴스**를 생성합니다.
  - 하위 클래스에서 구현해야 하는 setup() 메서드를 호출하여 초기화 작업을 수행합니다
  - **initialRender()**를 통해 초기 렌더링을 실행한 후, **bindEvents()**로 이벤트를 바인딩합니다.

### 2.2. 추상 메서드

**setup()**

```ts
protected abstract setup(): void;
```

- 하위 클래스는 **setup()** 메서드를 구현하여 초기 상태 설정, 이벤트 바인딩 등록, 기타 필요한 초기화 로직을 수행합니다. 이 메서드는 컴포넌트 생성 시 한 번 호출됩니다.

**template()**

```ts
protected abstract template(): string;
```

- 하위 클래스는 **template()** 메서드를 구현하여, 컴포넌트의 HTML 문자열을 반환합니다. 이 HTML 문자열은 **render()** 메서드를 통해 타겟 요소에 삽입됩니다.

### 2.3. 라이프사이클 메서드

**componentDidMount()**

```ts
protected componentDidMount(): void;
```

- 초기 렌더링 후, 컴포넌트가 DOM에 마운트된 뒤 호출됩니다. 하위 클래스는 이 메서드를 오버라이드하여 DOM 관련 후속 작업(데이터 페칭, 추가 이벤트 등록 등)을 수행할 수 있습니다.

**componentDidUpdate(changedKeys: (keyof State)[]): void**

- **changedKeys**: 최신 상태 업데이트에서 변경된 상태 키들의 배열입니다.
- **setState()**를 통해 상태가 업데이트된 후 호출됩니다. 하위 클래스는 이 메서드를 오버라이드하여 특정 상태 변경에 따른 추가 작업을 수행할 수 있습니다. 기본 구현은 빈 메서드입니다.

### 2.4. 상태 관리

**setState()**

```ts
protected setState(newState: Partial<State>): void;
```

- **newState**: 기존 상태와 병합할 새 상태 객체입니다.
- **StateStore**의 **setState()**를 호출하여 상태를 업데이트하고, 변경된 상태 키들을 받아 **componentDidUpdate()**를 호출합니다. 이 메서드를 통해 등록된 모든 상태 변경 감시자(**watchState()**)가 실행됩니다.

**getState()**

```ts
protected getState(): State;
```

- **StateStore**에서 현재 상태를 가져옵니다.

**watchState()**

```ts
protected watchState(stateKey: keyof State, callback: () => void): void;
```

- **stateKey**: 감시할 상태의 키입니다.
- **callback**: 해당 상태가 변경될 때 실행할 콜백 함수입니다.
- 지정된 상태 키에 대한 변경을 감시하여, 값이 변경될 때마다 콜백을 실행합니다.

### 2.5. 이벤트 바인딩

```ts
protected bindEvents(): void;
```

- **EventChannel**의 **bindEvents()**를 호출하여, 컴포넌트의 **eventBindings** 배열에 정의된 모든 이벤트를 타겟 요소에 바인딩합니다. 이벤트는 **AbortController**의 **signal**을 통해 관리되어, 필요 시 효율적으로 제거할 수 있습니다.

### 2.6. 렌더링

**render**

```ts
protected render(): void;
```

- **template()** 메서드에서 반환된 HTML 문자열로 타겟 요소의 내용을 갱신합니다.

**initialRender()**

```ts
protected initialRender(): void;
```

- 초기 렌더링을 수행한 후, **componentDidMount()**를 호출하여 컴포넌트가 마운트된 후의 작업을 실행합니다.

### 2.7. 정리 및 해제

**destroy**

```ts
public destroy(): void;
```

- **EventChannel**의 **destroy()** 메서드를 호출하여, 타겟 요소에 바인딩된 모든 이벤트 리스너를 해제합니다. 컴포넌트가 DOM에서 제거될 때 호출하여 메모리 누수를 방지합니다.

## 📌 3. 헬퍼 모듈

### StateStore

- 컴포넌트의 내부 상태를 관리하고, 상태 업데이트 시 변경된 키에 대해 등록된 콜백을 실행합니다.

주요 메서드:

- **getState()**: 현재 상태를 반환합니다.
- **setState(newState)**: 새 상태를 병합하여 업데이트하고, 변경된 키 배열을 반환하며, 감시자들을 실행합니다.
- **watchState(key, callback)**: 특정 상태 키에 대한 변경을 감시합니다.

### EventChannel

- 타겟 요소에 이벤트를 바인딩하고, **AbortController**를 사용해 이벤트 리스너를 효율적으로 관리합니다.

주요 메서드:

- **bindEvents(eventBindings)**: 이벤트 바인딩 배열을 받아, 이벤트 타입별로 그룹화 후 리스너를 등록합니다.
- **destroy()**: 바인딩된 이벤트 리스너들을 제거하고, **AbortController**를 초기화합니다.

## 📌 4. 사용 예제

```ts
import { Component } from "./core";

interface CounterState {
  count: number;
}

interface CounterProps {
  initialCount: number;
}

class CounterComponent extends Component<CounterState, CounterProps> {
  protected setup(): void {
    // 초기 상태 설정 (setState()를 통해 등록)
    this.setState({ count: this.props.initialCount });

    // 'increment' 액션에 대해 클릭 시 count 증가 처리
    this.eventBindings.push({
      action: "increment",
      eventType: "click",
      handler: () => {
        const currentCount = this.getState().count;
        this.setState({ count: currentCount + 1 });
      },
    });
  }

  protected template(): string {
    const { count } = this.getState();
    return `
      <div>
        <p>현재 카운트: ${count}</p>
        <button data-action="increment">증가</button>
      </div>
    `;
  }
}

export default CounterComponent;
```
