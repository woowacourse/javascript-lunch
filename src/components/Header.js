import addButton from '../../templates/add-button.png';

export default function Header($root, showRestaurantAddUI) {
  const $header = document.createElement('header');
  $header.className = 'gnb';

  this.init = () => {
    this.render();
    $header.addEventListener('click', showRestaurantAddUI);
    $root.appendChild($header);
  };

  this.render = () => {
    $header.innerHTML = `
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
     <button type="button" class="gnb__button" aria-label="음식점 추가">
       <img src="${addButton}" alt="음식점 추가">
     </button>
   `;
  };

  this.init();
}
