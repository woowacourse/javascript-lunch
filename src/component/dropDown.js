import { $ } from "../utils/selector.js";

function createDropDown({ id, callback, options, className, parent }) {
  const element = render({options, id, className});
  $(parent).innerHTML += element;
  $(`#${id}`).addEventListener('change', callback);   
}

// REFACTOR: createElement로 수정해야한다.
function render({options, id, className}) {
  return /*html*/ `
    <select id=${id} class=${className}>
      ${options.map((option) => `<option value=${option}>${option}</option>`)}
    </select>`;
}

export {createDropDown} ;
