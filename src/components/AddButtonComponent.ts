// export function AddButtonComponent() {
//   const getTemplate = () => {
//     const template = document.createElement('template');
//     template.innerHTML = /*html*/ `
//       <button type="button" class="gnb__button" aria-label="음식점 추가">
//         <img src="../templates/add-button.png" alt="음식점 추가" />
//       </button>
//       `;
//     const node = template.content.cloneNode(true) as DocumentFragment;

//     node.querySelector('.gnb__button')?.addEventListener('click', handleClick);

//     return node;
//   };

//   const handleClick = () => {
//     const modal = document.querySelector('.modal');

//     modal?.classList.add('modal--open');
//   };

//   return {
//     getTemplate,
//     handleClick
//   };
// }

const AddButtonComponent = () => {
  const handleClick = () => {
    const modal = document.querySelector('.modal');
    modal?.classList.add('modal--open');
  };

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'gnb__button';
  button.setAttribute('aria-label', '음식점 추가');

  const img = document.createElement('img');
  img.src = '../templates/add-button.png';
  img.alt = '음식점 추가';

  button.appendChild(img);
  button.addEventListener('click', handleClick);

  const create = () => button;

  return {
    create
    // handleClick
  };
};

export default AddButtonComponent;
