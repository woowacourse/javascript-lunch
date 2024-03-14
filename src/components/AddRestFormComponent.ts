import RestDataAPI from '../services/RestDataAPI';
import { FormItem, Restaurant } from '../types/types';
import { $ } from '../utils/dom';
import Component from './Component';

class AddRestFormComponent extends Component {
  protected render({ component }: { component: string }): string {
    const formItems: FormItem[] = [
      {
        label: '카테고리',
        type: 'select',
        id: 'category',
        options: ['한식', '중식', '일식', '양식', '아시안', '기타'],
        required: true
      },
      { label: '이름', type: 'text', id: 'name', required: true },
      {
        label: '거리(도보 이동 시간)',
        type: 'select',
        id: 'distance',
        options: ['5분 내', '10분 내', '15분 내', '20분 내', '30분 내'],
        required: true
      },
      { label: '설명', type: 'textarea', id: 'description' },
      { label: '참고 링크', type: 'text', id: 'link' }
    ];

    return `
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form>
        ${formItems.map((item) => this.createFormItem(item)).join('')}
        <div class="button-container">
          <button type="button" class="button button--secondary text-caption">취소하기</button>
          <button type="submit" class="button button--primary text-caption">추가하기</button>
        </div>
      </form>
    `;
  }

  private createFormItem({ label, type, id, options, required }: FormItem): string {
    const basicItem = `<label for="${id} text-caption">${label}</label>`;
    let inputItem = '';

    if (type === 'select' && options) {
      inputItem = `<select name="${id}" id="${id}" ${required ? 'required' : ''}>
        <option value="">선택해 주세요</option>
        ${options.map((option: string) => `<option value="${option.toLowerCase()}">${option}</option>`).join('')}
      </select>`;
    } else if (type === 'textarea') {
      inputItem = `<textarea name="${id}" id="${id}" cols="30" rows="5" ${required ? 'required' : ''}></textarea>`;
    } else {
      inputItem = `<input type="${type}" name="${id}" id="${id}" ${required ? 'required' : ''}>`;
    }

    return `<div class="form-item ${required ? 'form-item--required' : ''}">${basicItem}${inputItem}</div>`;
  }

  protected setEvents() {
    this.addEvent({ target: $('form', this), type: 'submit', handler: this.handleSubmit });
    this.addEvent({ target: $('.button--secondary', this), type: 'click', handler: this.handleCancel });
  }

  private handleSubmit: EventListener = (e): void => {
    e.preventDefault();
    RestDataAPI.save(this.getFormData());
    this.emitCustomEvent('closeModal');
  };

  private handleCancel: EventListener = (): void => {
    this.emitCustomEvent('closeModal');
  };

  private getFormData(): Restaurant {
    const formData = ['category', 'name', 'distance', 'description', 'link'].reduce((acc, id) => {
      const element = $(`#${id}`) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      acc[id] = element.value;
      return acc;
    }, {} as any);

    return formData;
  }
}

customElements.define('add-rest-form', AddRestFormComponent);
