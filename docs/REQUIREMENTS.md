# 기능 구현 목록

## 음식점

- 데이터 :
  - 카테고리 :"한식", "중식", "일식", "아시안", "양식", "기타" ,
  - 이름 : 모든 문자 , 글자 수 제한- 10자
  - 거리 :도보 이동 시간:5, 10, 15, 20, 30
  - 설명 : 한글 , 글자 수 제한- 150자
    - 개행 추가 시 개행 보여줌
  - 참고 링크 :영문 (http, https로 시작) ,글자 수 제한- 2000자
  - (2단계) 즐겨찾기 여부 :boolean
- 필수 데이터 :카테고리, 이름, 거리
- 입력값에 대한 유효성 검사 (유효하지 않으면 오류) - 검사 항목 - 필수 데이터: 타입, 입력값 - 참고 링크 : http, https로 시작하는 지 여부
  -(2단계): 즐겨찾기 추가/삭제

## 음식점 목록

- 카테고리별 필터링 :가게 이름 기준 오름차순
- 이름순/거리순 정렬 : 오름차순
- 음식점 추가
- localStorage에서 데이터 관리

# 컴포넌트

## 계획

- RestaurantIcon
  - Restaurant의 카테고리별 아이콘
- Restaurant
  - 음식점에 대한 컴포넌트
- Restaurants
  - 음식점 목록을 관리하는 컴포넌트
- Button
  - color, text, 버튼 클릭 시 기능이 담긴 컴포넌트
- DropBox
  - 선택 카테고리를 관리하는 컴포넌트
- TopBar
  - 페이지 상단의 헤더와 음식점 추가 버튼이 담긴 컴포넌트
- Modal
- Fieldset
  - 음식점 추가 시, 음식점에 대한 폼안에 쓰이는 하위 요소들을 음식점의 데이터별로 묶어서 관리하는 컴포넌트
- Input
  - XSS를 방지와 입력값에 대한 유효성 검사를 진행하는 컴포넌트

## 구현

- AddBtn
  - 음식점 추가 버튼
- CategoryIcon
  - 음식점 카테고리에 따른 아이콘
- CustomInput
  - XSS를 방지하는 input
- CustomModal
  - 모달
- CustomTextarea
  - - XSS를 방지하는 input
- DefaultBtn
  - 기본적인 버튼으로 색상 선택 가능
- DropBox
  - 옵션들을 선택 가능한 select 드롭 박스
- ErrorMessageBox
  - 에러 메세지
- FormTextField
  - 입력값의 오류 여부에 따라 오류 메세지를 입력란 하위에 보여주는 컴포넌트
- RestaurantComponent
  - 음식점 정보를 담긴 컴포넌트
- RestaurantFormModalInner
  - 음식점 추가 modal의 내부 form
