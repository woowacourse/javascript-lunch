# 기능 명세서

## 기능 구현

- [x] 모달 버튼을 누르면 모달을 띄운다.
- [x] 취소하기 누르면 모달이 닫힌다.
- [x] 추가하기 누르면 리스트에 추가된다.
- [ ] 유효성 검사 추가

## UI 테스트

### 1. 헤더(Header)

- [x]헤더에 **'점심 뭐 먹지'** 텍스트가 표시되는지 확인한다.
- [x]헤더에 버튼이 표시되는지 확인한다.

### 2. 본문(Body)

#### 레스토랑 아이템

- [x] 가게의 **아이콘**이 표시되는지 확인한다.
- [x] 가게의 **이름(Title)**이 표시되는지 확인한다.
- [x] 캠퍼스로부터의 **소요 시간(분 단위)**이 표시되는지 확인한다.
- [x] 가게의 **설명(Description)**이 표시되는지 확인한다.

### 3. 모달(Modal)

- [x]모달이 표시될 때 **배경이 어두워지는지 확인한다**.
- [x]모달의 제목이 **'새로운 음식점'**으로 표시되는지 확인한다.
- [x]**카테고리(Category) Dropdown**을 클릭했을 때 다음 항목이 표시되는지 확인한다:
  - 한식, 중식 ,일식 ,아시안 ,양식 ,기타
- [x]**이름(Name) 입력 텍스트 박스**가 표시되는지 확인한다.
- [x]**거리(Distance) Dropdown**을 클릭했을 때 다음 항목이 표시되는지 확인한다:
  - 5분, 10분, 15분, 20분, 30분
- [x]**설명(Description) 입력 텍스트 박스**가 표시되는지 확인한다.
- [x]**참고 링크(Reference Link) 입력 텍스트 박스**가 표시되는지 확인한다.
- [x]모달 하단에 다음 버튼이 표시되는지 확인한다:
  - **'취소하기' 버튼**
  - **'추가하기' 버튼**

### 리팩토링 계획
- [ ] dom 요소에 $표시 추가
- [x] 헤더분리
- [x] 레스토랑 아이템 분리
- [x] 레스토랑 리스트 분리
- [ ] 모달 분리
- [ ] CustomDropdown
- [ ] CustomInput
- [ ] CustomButton