import {
  CATEGORY_IMAGE_PATH,
  FAVORITE_IMAGE_PATH,
  LOCAL_STORAGE_KEY,
} from '../../src/constant';
import { writeRestaurantAddForm, checkRestaurantItem } from '../testfunctions';
import TEST_CASES from '../../testcase/e2e-testcase';

describe('레스토랑 추가 테스트', () => {
  it('레스토랑 정보를 입력하면, 레스토랑이 추가되어야 한다.', () => {
    cy.visit('/');

    cy.get('.modal.modal--open').should('not.exist');
    cy.get('#header-add-button').click();
    cy.get('.modal.modal--open').should('exist');

    writeRestaurantAddForm({
      category: '중식',
      name: '차이나타운',
      distanceInMinutes: '15',
      description: '"차이나타운"은 중국 요리를 전문으로 하는 레스토랑입니다.',
      link: 'https://chinatown.com/',
    });

    cy.get('.modal.modal--open').should('not.exist');

    checkRestaurantItem(0, {
      imageSrc: CATEGORY_IMAGE_PATH['중식'],
      name: '차이나타운',
      distanceInMinutes: '15',
      description: '"차이나타운"은 중국 요리를 전문으로 하는 레스토랑입니다.',
      favoriteSrc: FAVORITE_IMAGE_PATH.unstarred,
    });
  });

  it('레스토랑 입력은 올바르게 적어야 한다. 만약 잘못 적은 경우에는 레스토랑이 추가되지 않아야 한다.', () => {
    cy.visit('/');

    cy.get('.modal.modal--open').should('not.exist');
    cy.get('#header-add-button').click();
    cy.get('.modal.modal--open').should('exist');

    writeRestaurantAddForm({
      category: '중식',
      name: '차이나타운',
      distanceInMinutes: '',
      description: '"차이나타운"은 중국 요리를 전문으로 하는 레스토랑입니다.',
      link: 'https://chinatown.com/',
    });

    cy.get('.modal.modal--open').should('exist');
    cy.get('#add-modal-cancel').click();

    cy.get('.modal.modal--open').should('not.exist');
    cy.get('#header-add-button').click();
    cy.get('.modal.modal--open').should('exist');

    writeRestaurantAddForm({
      category: '',
      name: '차이나타운',
      distanceInMinutes: '15',
      description: '"차이나타운"은 중국 요리를 전문으로 하는 레스토랑입니다.',
      link: 'https://chinatown.com/',
    });

    cy.get('.modal.modal--open').should('exist');
    cy.get('#add-modal-cancel').click();

    cy.get('.modal.modal--open').should('not.exist');
    cy.get('#header-add-button').click();
    cy.get('.modal.modal--open').should('exist');

    writeRestaurantAddForm({
      category: '중식',
      name: '차이나타운',
      distanceInMinutes: '15',
      description: '',
      link: 'chinatowncom',
    });

    cy.get('.modal.modal--open').should('exist');
    cy.get('#add-modal-cancel').click();

    cy.get('.modal.modal--open').should('not.exist');
    cy.get('#header-add-button').click();
    cy.get('.modal.modal--open').should('exist');

    writeRestaurantAddForm({
      category: '중식',
      name: '차이나타운',
      distanceInMinutes: '15',
      description: '"차이나타운"은 중국 요리를 전문으로 하는 레스토랑입니다.',
      link: 'https://chinatown.com/',
    });

    cy.get('#modal.modal--open').should('not.exist');

    checkRestaurantItem(0, {
      imageSrc: CATEGORY_IMAGE_PATH['중식'],
      name: '차이나타운',
      distanceInMinutes: '15',
      description: '"차이나타운"은 중국 요리를 전문으로 하는 레스토랑입니다.',
      favoriteSrc: FAVORITE_IMAGE_PATH.unstarred,
    });
  });
});

describe('레스토랑 팝업 테스트', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(TEST_CASES));
    });
  });

  it('레스토랑 항목을 클릭하면, 모달에 레스토랑의 정보를 표시해야 한다. 레스토랑 목록은 처음에 이름순으로 정렬되어 있음에 유의한다.', () => {
    cy.visit('/');

    cy.get('.restaurant').eq(0).click();
    cy.get('#restaurant-info-modal.modal.modal--open').should('exist');
    cy.get('#restaurant-info-modal .restaurant__name').should(
      'have.text',
      '뉴욕스테이크하우스'
    );
    cy.get('#restaurant-info-modal .restaurant__link').should(
      'have.text',
      'https://new-york.com/'
    );

    cy.get('#info-modal-close').click();
    cy.get('#restaurant-info-modal.modal.modal--open').should('not.exist');

    cy.get('.restaurant').eq(3).click();
    cy.get('#restaurant-info-modal.modal.modal--open').should('exist');
    cy.get('#restaurant-info-modal .restaurant__name').should(
      'have.text',
      '우리집 일본집'
    );

    cy.get('#info-modal-close').click();
    cy.get('#restaurant-info-modal.modal.modal--open').should('not.exist');
  });

  it('레스토랑 항목을 삭제하면, 목록에서 제거되어야 한다.', () => {
    cy.visit('/');

    cy.get('.restaurant').eq(2).click();
    cy.get('#info-modal-delete').click();
    cy.get('.restaurant').eq(0).click();
    cy.get('#info-modal-delete').click();

    checkRestaurantItem(0, {
      imageSrc: CATEGORY_IMAGE_PATH['양식'],
      name: '스파이스 & 화이트',
      distanceInMinutes: '10',
      description:
        '서양의 전통적인 맛과 동양의 향신료를 조합하여 새로운 맛을 만들어낸 혁신적인 양식 레스토랑입니다.',
      favoriteSrc: FAVORITE_IMAGE_PATH.unstarred,
    });

    checkRestaurantItem(1, {
      imageSrc: CATEGORY_IMAGE_PATH['일식'],
      name: '우리집 일본집',
      distanceInMinutes: '20',
      description:
        '일본의 전통적인 맛과 우리나라의 감성이 결합된, 깔끔하고 정갈한 일식 레스토랑입니다.',
      favoriteSrc: FAVORITE_IMAGE_PATH.unstarred,
    });
  });
});

describe('레스토랑 필터링 테스트', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(TEST_CASES));
    });
  });

  it('양식 필터링을 적용하면, 양식 음식점만 리스트에 보여야 한다.', () => {
    cy.visit('/');
    cy.get('#category-filter').select('양식');

    checkRestaurantItem(0, {
      imageSrc: CATEGORY_IMAGE_PATH['양식'],
      name: '뉴욕스테이크하우스',
      distanceInMinutes: '30',
      description:
        '미국의 대표적인 요리 중 하나인 스테이크과 함께 다양한 면과 샐러드 등 다양한 메뉴를 즐길 수 있는 레스토랑입니다.',
      favoriteSrc: FAVORITE_IMAGE_PATH.unstarred,
    });

    checkRestaurantItem(1, {
      imageSrc: CATEGORY_IMAGE_PATH['양식'],
      name: '스파이스 & 화이트',
      distanceInMinutes: '10',
      description:
        '서양의 전통적인 맛과 동양의 향신료를 조합하여 새로운 맛을 만들어낸 혁신적인 양식 레스토랑입니다.',
      favoriteSrc: FAVORITE_IMAGE_PATH.unstarred,
    });

    cy.get('#restaurant-list-root .restaurant').eq(2).should('not.exist');
  });

  it('거리 순으로 정렬하면, 거리가 가까운 순서대로 음식점이 리스트에 보여야 한다.', () => {
    cy.visit('/');
    cy.get('#sorting-filter').select('거리순');

    checkRestaurantItem(0, {
      imageSrc: CATEGORY_IMAGE_PATH['한식'],
      name: '신선한밥상',
      distanceInMinutes: '5',
      description:
        '당신이 상상하는 전통적인 한국의 맛을 살린 새로운 조합으로 만날 수 있는 레스토랑입니다.',
      favoriteSrc: FAVORITE_IMAGE_PATH.unstarred,
    });

    checkRestaurantItem(1, {
      imageSrc: CATEGORY_IMAGE_PATH['양식'],
      name: '스파이스 & 화이트',
      distanceInMinutes: '10',
      description:
        '서양의 전통적인 맛과 동양의 향신료를 조합하여 새로운 맛을 만들어낸 혁신적인 양식 레스토랑입니다.',
      favoriteSrc: FAVORITE_IMAGE_PATH.unstarred,
    });

    checkRestaurantItem(2, {
      imageSrc: CATEGORY_IMAGE_PATH['일식'],
      name: '우리집 일본집',
      distanceInMinutes: '20',
      description:
        '일본의 전통적인 맛과 우리나라의 감성이 결합된, 깔끔하고 정갈한 일식 레스토랑입니다.',
      favoriteSrc: FAVORITE_IMAGE_PATH.unstarred,
    });

    checkRestaurantItem(3, {
      imageSrc: CATEGORY_IMAGE_PATH['양식'],
      name: '뉴욕스테이크하우스',
      distanceInMinutes: '30',
      description:
        '미국의 대표적인 요리 중 하나인 스테이크과 함께 다양한 면과 샐러드 등 다양한 메뉴를 즐길 수 있는 레스토랑입니다.',
      favoriteSrc: FAVORITE_IMAGE_PATH.unstarred,
    });
  });

  it('즐겨찾기에 음식점을 추가하고, 즐겨찾기 필터링을 적용하면, 정렬/필터링 기준과 관계없이 즐겨찾기한 음식점 목록만이 이름순으로 나열되어 있어야 한다.', () => {
    cy.visit('/');
    cy.get('#restaurant-list .favorite-button').eq(1).click();
    cy.get('.restaurant').eq(2).click();
    cy.get('#restaurant-info-modal .favorite-button').click();

    cy.get('#restaurant-info-modal .favorite-icon').should(
      'have.attr',
      'src',
      FAVORITE_IMAGE_PATH.starred
    );

    cy.get('#info-modal-close').click();

    checkRestaurantItem(1, {
      imageSrc: CATEGORY_IMAGE_PATH['양식'],
      name: '스파이스 & 화이트',
      distanceInMinutes: '10',
      description:
        '서양의 전통적인 맛과 동양의 향신료를 조합하여 새로운 맛을 만들어낸 혁신적인 양식 레스토랑입니다.',
      favoriteSrc: FAVORITE_IMAGE_PATH.starred,
    });

    checkRestaurantItem(2, {
      imageSrc: CATEGORY_IMAGE_PATH['한식'],
      name: '신선한밥상',
      distanceInMinutes: '5',
      description:
        '당신이 상상하는 전통적인 한국의 맛을 살린 새로운 조합으로 만날 수 있는 레스토랑입니다.',
      favoriteSrc: FAVORITE_IMAGE_PATH.starred,
    });

    cy.get('#category-filter').select('한식');

    checkRestaurantItem(0, {
      imageSrc: CATEGORY_IMAGE_PATH['한식'],
      name: '신선한밥상',
      distanceInMinutes: '5',
      description:
        '당신이 상상하는 전통적인 한국의 맛을 살린 새로운 조합으로 만날 수 있는 레스토랑입니다.',
      favoriteSrc: FAVORITE_IMAGE_PATH.starred,
    });
    cy.get('#restaurant-list-root .restaurant').eq(1).should('not.exist');

    cy.get('.favorite-radio[for="favorite-filter-favorite"]').click();

    checkRestaurantItem(0, {
      imageSrc: CATEGORY_IMAGE_PATH['양식'],
      name: '스파이스 & 화이트',
      distanceInMinutes: '10',
      description:
        '서양의 전통적인 맛과 동양의 향신료를 조합하여 새로운 맛을 만들어낸 혁신적인 양식 레스토랑입니다.',
      favoriteSrc: FAVORITE_IMAGE_PATH.starred,
    });

    checkRestaurantItem(1, {
      imageSrc: CATEGORY_IMAGE_PATH['한식'],
      name: '신선한밥상',
      distanceInMinutes: '5',
      description:
        '당신이 상상하는 전통적인 한국의 맛을 살린 새로운 조합으로 만날 수 있는 레스토랑입니다.',
      favoriteSrc: FAVORITE_IMAGE_PATH.starred,
    });

    cy.get('.favorite-radio[for="favorite-filter-all"]').click();

    checkRestaurantItem(0, {
      imageSrc: CATEGORY_IMAGE_PATH['한식'],
      name: '신선한밥상',
      distanceInMinutes: '5',
      description:
        '당신이 상상하는 전통적인 한국의 맛을 살린 새로운 조합으로 만날 수 있는 레스토랑입니다.',
      favoriteSrc: FAVORITE_IMAGE_PATH.starred,
    });
    cy.get('#restaurant-list-root .restaurant').eq(1).should('not.exist');

    cy.get('#restaurant-list .favorite-button').eq(0).click();
    cy.get('.favorite-radio[for="favorite-filter-favorite"]').click();

    checkRestaurantItem(0, {
      imageSrc: CATEGORY_IMAGE_PATH['양식'],
      name: '스파이스 & 화이트',
      distanceInMinutes: '10',
      description:
        '서양의 전통적인 맛과 동양의 향신료를 조합하여 새로운 맛을 만들어낸 혁신적인 양식 레스토랑입니다.',
      favoriteSrc: FAVORITE_IMAGE_PATH.starred,
    });
    cy.get('#restaurant-list-root .restaurant').eq(1).should('not.exist');

    cy.get('#restaurant-list .favorite-button').click();
    cy.get('#restaurant-list-root .restaurant').should('not.exist');
  });
});
