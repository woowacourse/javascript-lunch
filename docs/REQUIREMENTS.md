# ✅ 기능 목록

---

- [x] 음식점 추가 아이콘을 클릭하면 모달창이 열린다. - view
- [x] 사용자가 카테고리를 선택한다. - view
- [x] 사용자가 이름을 입력한다. - view
  - [x]❗[ 예외 ] 특수 문자는 입력할 수 없다.
  - [x]❗[ 예외 ] 공백만 입력할 수 없다.
  - [x]❗[ 예외 ] 이름은 1 ~ 15자여야 한다.
  - [x]❗[ 예외 ] 음식점 이름은 중복될 수 없다.
- [x] 사용자가 거리를 선택한다. - view
- [x] 별표(\*)는 필수로 입력해야 한다. - view
- [x] 사용자는 설명란에 설명을 작성할 수 있다. - view
- [x] 사용자는 참고 링크도 입력할 수 있다. - view
- [x] 취소하기를 누르면 모달창을 닫는다. - view
- [x] 모달창이 아닌 공간을 클릭하면 모달창을 닫는다. - view
- [x] 모달창을 닫으면 입력했던 데이터는 모두 초기화한다. - domain
- [x] 추가하기를 누르면 새로운 음식점이 추가된다. - domain
- [x] 새로 추가한 음식점도 로컬 스토리지에 저장한다. - domain
- [x] 새로고침을 해도 사라지지 않도록 로컬 스토리지에 저장한다. - domain
- [x] 전체 필터를 클릭하면 카테고리를 선택할 수 있다. - view
  - [x] 선택된 카테고리의 음식점만 보여준다. (ex. 한식을 선택할 경우, 카테고리가 한식인 음식점만 보여준다.) - domain
- [x] 이름순 혹은 거리순으로 음식점 목록을 정렬할 수 있다. - domain

# Refactoring

## HTML CSS

- [x] html 더 나은 구조로 수정하기
- [x] 모달을 열면 너무 크게 나오는 버그 (PC 버전에서 backdrop 영역도 너무 적다)
- [x] select에 label 명시하기
- [x] link input 타입 수정 및 placeholder 부여하기
- [x] 이름에 제약사항 설명 추가하기
- [x] 새로운 음식점 추가/삭제하기 버튼에 aria-label 부여하기

## 기능

- [x] 모달 오픈/클로즈 이벤트 콜백 함수 재사용성 높이기
- [x] 새로운 음식점 등록 중 예외가 발생했을 때 모달을 닫지 않고, 인풋 값을 초기화하기
- [x] `updateRestaurantList()` 는 `render` 로 분리하기
- [x] `updateRestaurantList()` 에서 local storage 저장 함께 하기
- [x] template literal 포맷 맞추기
- [x] `getListOnLocalStorage()` 빈 값이 리턴되었을 때 처리
- [x] `getListOnLocalStorage()` 추상화하기
- [x] 이벤트 핸들러 유틸 추상화 심화하기
- [x] `executeChangeEventListener()` 네이밍 수정하기
- [x] `export interface CustomError extends Error {}` 제거하기
- [x] `errorChecker` 의 if 조건문 수정하기
- [x] `validator/index.ts` 에서 `validateName` 인자 네이밍을 수정하기
- [x] 타입이 확실한 인자는 컴파일러가 타입 추론하게 수정하기
- [x] constants/index.ts 타입스크립트스럽게 수정하기
- [x] as 말고 ! assertion 사용해보기

## TEST

- [x] 테스트 코드에서 css, image import할 때 발생하는 오류 수정
- [x] 테스트 코드 추가하기

## 개발 환경

- [x] prettier default 속성 지우기
