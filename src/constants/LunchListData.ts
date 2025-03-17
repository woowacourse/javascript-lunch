export const LunchListData = [
  {
    id: crypto.randomUUID(),
    category: "korean",
    name: "피양콩할머니",
    distance: 10,
    description:
      "2005년 장모님에게 전수받은 설렁탕 조리법을 개선하여 시작했다는 외고집의 설렁탕 맛집입니다. 진하고 깊은 국물 맛과 부드러운 고기가 특징이며, 다양한 밑반찬도 깔끔하게 나옵니다. 특히 깍두기와 배추김치가 잘 어우러져 국물의 감칠맛을 더해줍니다.",
    isFavorite: true,
  },
  {
    id: crypto.randomUUID(),
    category: "chinese",
    name: "친친",
    distance: 10,
    description:
      "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식 요리를 선보이는 곳입니다. 대표 메뉴로는 짜장면, 탕수육, 깐풍기가 있으며, 신선한 재료와 풍부한 맛이 특징입니다. 내부 인테리어가 깔끔하고 분위기가 좋아 가족 모임이나 회식 장소로 인기가 많습니다.",
    isFavorite: false,
  },
  {
    id: crypto.randomUUID(),
    category: "japanese",
    name: "스시 오마카세",
    distance: 8,
    description:
      "정통 일본식 스시 오마카세 전문점으로, 숙련된 셰프가 신선한 재료를 사용해 손님 눈앞에서 바로 스시를 준비해 줍니다. 회전율이 빠르고, 고급스러운 분위기에서 제철 재료로 만든 다양한 스시를 즐길 수 있습니다. 예약이 필수이며, 가격대는 높은 편이지만 만족도가 매우 높습니다.",
    isFavorite: true,
  },
  {
    id: crypto.randomUUID(),
    category: "western",
    name: "버거 플래닛",
    distance: 5,
    description:
      "수제 버거 전문점으로, 신선한 재료와 두툼한 패티가 특징입니다. 다양한 토핑 옵션과 사이드 메뉴가 준비되어 있으며, 프라이드 포테이토와 밀크쉐이크도 인기가 많습니다. 매장은 깔끔하고 캐주얼한 분위기로, 친구들과의 모임이나 간단한 식사에 적합합니다.",
    isFavorite: false,
  },
  {
    id: crypto.randomUUID(),
    category: "western",
    name: "라 파스타",
    distance: 12,
    description:
      "이탈리아 전통 방식의 파스타와 피자를 선보이는 레스토랑입니다. 신선한 재료와 자체 제작한 소스를 사용해 깊은 풍미를 자랑합니다. 대표 메뉴로는 까르보나라, 봉골레 파스타, 마르게리타 피자가 있으며, 와인 리스트도 잘 갖춰져 있습니다. 분위기가 로맨틱해 데이트 장소로 인기가 많습니다.",
    isFavorite: true,
  },
  {
    id: crypto.randomUUID(),
    category: "korean",
    name: "명동 칼국수",
    distance: 6,
    description:
      "칼국수 전문점으로, 진한 멸치 육수와 쫄깃한 면발이 특징입니다. 김치가 칼국수와 잘 어울리며, 추가로 왕만두를 함께 주문하면 더욱 든든한 한 끼가 됩니다. 가격이 합리적이며, 빠른 회전율 덕분에 대기 시간이 짧은 편입니다.",
    isFavorite: false,
  },
] as const;
