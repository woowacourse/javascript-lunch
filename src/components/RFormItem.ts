import RComponent from './RComponent';

class RFormItem extends RComponent {
  renderTemplate(): string {
    return `
        <style>
            color: var(--grey-300);
        </style>
        <div>
            <lable>참고 링크</lable>
            <slot></slot>
            <span>매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
        </div>
      `;
  }
}

customElements.define('r-form-item', RFormItem);

export default RFormItem;