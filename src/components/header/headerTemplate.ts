import imageSrc from '../../../templates/add-button.png';

const headerTemplate = /*html*/ `
<header class="gnb">
  <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
  <button type="button" class="gnb__button" aria-label="음식점 추가">
    <img src="${imageSrc}" alt="음식점 추가" />
  </button>
</header>`;

export default headerTemplate;
