addEventListener('load', () => {
  const app = document.querySelector('#app');

  const header = createHeader({ title: '점심 뭐 먹지' });
  app.prepend(header);
});

function createHeader({ title }) {
  const header = document.createElement('header');

  header.innerHTML = `<h1 class="gnb__title text-title">${title}</h1>
    <button type="button" class="gnb__button" aria-label="음식점 추가">
      <img src="./add-button.png" alt="음식점 추가" />
    </button>`;
  header.classList.add('gnb');

  return header;
}
