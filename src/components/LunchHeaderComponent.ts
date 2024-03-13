import { $ } from '../util/dom';
import { AddButtonComponent } from './AddButtonComponent';

// export function LunchHeaderComponent() {
//   const buttonComponent = AddButtonComponent();

//   const getTemplate = () => {
//     const template = document.createElement('template');
//     template.innerHTML = `
//     <header class="gnb">
//       <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
//       ${buttonComponent.getTemplate()}
//     </header>
//   `;
//     const node = template.content.cloneNode(true);

//     return node;
//   };

//   const setEvent = () => {
//     // GNB 컴포넌트 이벤트 설정
//     const $button = $('.gnb__button') as Element;
//     $button.addEventListener('click', buttonComponent.handleClick);
//   };

//   return {
//     getTemplate,
//     setEvent
//   };
// }

export function LunchHeaderComponent() {
  const buttonComponent = AddButtonComponent();

  const getTemplate = () => {
    const template = document.createElement('template');
    template.innerHTML = `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    </header>
  `;
    const node = template.content.cloneNode(true) as DocumentFragment;
    node.querySelector('.gnb')?.appendChild(buttonComponent.getTemplate());
    return node;
  };

  // const setEvent = () => {
  //   const $button = $('.gnb__button') as Element; // node를 사용하여 버튼을 찾습니다.
  //   $button.addEventListener('click', buttonComponent.handleClick);
  // };

  return {
    getTemplate
    // setEvent
  };
}
