const tab = ({ id, label, checked }) => {
  return `
    <input id=${id} type="radio" name="listType" ${checked ? 'checked' : ''}/>
    <label class="tab" for="${id}">${label}</label>
  `;
};

export default tab;
