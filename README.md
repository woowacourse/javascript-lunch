# 점심 뭐 먹지

## 작업순서

- 동적 vs 정적 렌더링 구역 정한다.
  - 정적인 부분 : 헤더, 모달 내부
  - 동적인 부분 : 레스토랑 아이템, 레스토랑 리스트
- 컴포넌트를 어떻게 구성할지 정한다.
  - 공통 컴포넌트
    - 버튼
    - 텍스트 컴포넌트 (색상, 사이즈)
- HTML에 하드코딩 되어있는 부분을 컴포넌트로 분리한다.
- E2E
- 에러처리

### 기능적인 부분

- 음식점이 추가가 되어야 한다.
- 새로고침 후 추가한 음식점 정보 초기화되어야 한다.
- 카테고리로 필터링 가능해야 한다.
- 이름순 & 거리순으로 필터링 가능해야 한다.
