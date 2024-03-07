import { CATEGORIES } from '../../constants/categories';
import { DISTANCE } from '../../constants/distance';
import { Category, Distance } from '../../types';

// type FormItemType = 'dropdown' | 'input' | 'textArea';
// type NameType = 'category' | 'distance' | 'description';

const LUNCH_FORM_ITEM_DROPDOWN = (name: string) => `
<div class="form-item form-item--required">
  <label for="category text-caption">${LABELS[name]}</label>
  <select name="${name}" id="category" class="dropdown-items" required>

  </select>
</div>
`;

const DROPDOWN_OPTION = (value: string) => `
  <option value=${value}>${value}</option>
`;

const LUNCH_FORM_ITEM_INPUT = (name: string) => `
<div class="form-item form-item--required">
  <label for="name text-caption">가게명</label>
  <input type="text" name="name" id="name" required>
</div>
`;

const LUNCH_FORM_ITEM_TEXTAREA = (name: string) => `
<div class="form-item">
  <label for="description text-caption"> 설명 </label>
  <textarea name="description" id="description" cols="30" rows="5"> </textarea>
  <span class="help-text text-caption"> 메뉴 등 추가 정보를 입력해 주세요.</span>
</div>
`;

type LabelsType = {
  [index: string]: string;
  category: string;
  distance: string;
};

const LABELS: LabelsType = {
  category: '카테고리',
  distance: '거리(도보 이동 시간)',
};

type FormItemType = 'dropdown' | 'input' | 'textArea';

type RenderTypeProps = {
  name: string;
  type: FormItemType;
};

class LunchFormItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render(): void {
    const type = this.getAttribute('type') as FormItemType;
    const name = this.getAttribute('name') ?? '';
    this.innerHTML = this.renderType({ name, type }) ?? '';
    this.renderDropdownOptions(name);
  }

  renderType({ name, type }: RenderTypeProps): string {
    switch (type) {
      case 'dropdown':
        return LUNCH_FORM_ITEM_DROPDOWN(name);
      case 'input':
        return LUNCH_FORM_ITEM_INPUT(name);
      case 'textArea':
        return LUNCH_FORM_ITEM_TEXTAREA(name);
    }
  }

  renderDropdownOptions(name: string): void {
    const optionItems: string[] = ["<option value=''>선택해 주세요</option>"];
    if (name === 'category') {
      Object.values(CATEGORIES).forEach((element) => {
        optionItems.push(DROPDOWN_OPTION(element));
      });
    }
    if (name === 'distance') {
      Object.values(DISTANCE).forEach((element) => {
        optionItems.push(DROPDOWN_OPTION(`${element}`));
      });
    }

    const options = this.querySelector('.dropdown-items');
    if (options) {
      options.innerHTML = optionItems.join('');
    }
  }
}
customElements.define('lunch-form-item', LunchFormItem);
