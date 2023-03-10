# 구현할 기능 목록

## 도메인

- 음식점 추가

- 정렬, 필터링

- 입력값 검증

## 유틸

- 로컬 스토리지 활용

## UI

DOM 구조

```
앱
├─ 헤더
├─ 메인
    ├─ 필터
    │   ├─ *샐랙트*
    ├─ 리스트
    │   ├─ 음식점 리스트
    │       ├─ *음식점*
    │       ├─ *음식점*
    ├─ 모달
        ├─ 폼
            ├─ *샐랙트*
            ├─ *버튼 2개*
```

### 내 컴포넌트의 역할, 정의

거대한 HTML 덩어리를 보기 쉽고 수정하기 쉽게 도와줘야 한다.
원하는 모습을 추상화하고 이벤트에서 재활용한다.

```javascript
body = `
${header()}
<main>
  <section class="restaurant-container">
    ${select()}
    ${select()}
  </section>
  <section class="restaurant-container">
    ${list()}
  </section>
  <modal>
    <h2></h2>
    <form>
      ${select()}
      ${select()}
      <div class="button-container">
        ${button()}
        ${button()}
      </div>
    </form>
  </modal>
</main>
`;
```
