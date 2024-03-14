export function AddButtonComponent() {
  const getTemplate = () => {
    const template = document.createElement('template');
    template.innerHTML = /*html*/ `
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="../templates/add-button.png" alt="음식점 추가" />
      </button>
      `;
    const node = template.content.cloneNode(true) as DocumentFragment;

    node.querySelector('.gnb__button')?.addEventListener('click', handleClick);

    return node;
  };

  const handleClick = () => {
    const modal = document.querySelector('.modal');

    modal?.classList.add('modal--open');
  };

  return {
    getTemplate,
    handleClick
  };
}
