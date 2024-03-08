import { CATEGORIES_KEYS, CONDITIONS } from '@/constants/Condition';
import BasicModal from '../BasicModal/BasicModal';
import SelectBox from '../SelectBox/SelectBox';
import BaseComponent from '../BaseComponent';
import BasicButton from '../BasicButton/BasicButton';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { IRestaurant } from '@/types/Restaurant';
import RestaurantList from '../RestaurantList/RestaurantList';

class NewRestaurantModal extends BaseComponent {
  #form;
  #title;

  constructor() {
    super();
    this.#form = document.createElement('form');
    this.#title = document.createElement('h2');

    this.#title.classList.add('modal-title', 'text-title');
    this.#title.textContent = '새로운 음식점';
  }

  render() {
    this.#makeForm();

    const $fragment = new DocumentFragment();
    $fragment.append(this.#title);
    $fragment.append(this.#form);
    this.append(new BasicModal($fragment));
  }

  #makeForm() {
    /* 카테고리 선택 */
    const $categorySelection = this.#makeCategorySelectBox();
    this.#form.append($categorySelection);

    /*이름 인풋박스*/
    const $nameInputBox = document.createElement('div');
    $nameInputBox.classList.add('form-item', 'form-item--required');
    $nameInputBox.innerHTML = `
    <label for="name text-caption">이름</label>
     <input type="text" name="name" id="name" required />
    `;
    this.#form.append($nameInputBox);

    /*거리 셀렉트 박스*/
    const $distanceSelection = document.createElement('div');
    $distanceSelection.classList.add('form-item', 'form-item--required');
    $distanceSelection.innerHTML = `<label for="distance text-caption">거리(도보 이동 시간) </label>    `;
    $distanceSelection.append(
      new SelectBox(
        CONDITIONS.DISTANCES.map((num) => `${String(num)}분 내`),
        'distance',
      ),
    );
    this.#form.append($distanceSelection);

    /*설명 인풋*/
    const $descriptionTextBox = document.createElement('div');
    $descriptionTextBox.classList.add('form-item');
    $descriptionTextBox.innerHTML = `
              <label for="description text-caption">설명</label>
              <textarea name="description" id="description" cols="30" rows="5"></textarea>
              <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
`;

    this.#form.append($descriptionTextBox);

    /*링크 인풋*/
    const $linkTextBox = document.createElement('div');
    $linkTextBox.classList.add('form-item');
    $linkTextBox.innerHTML = ` <label for="link text-caption">참고 링크</label>
                <input type="text" name="link" id="link" />
                 <span class="help-text text-caption"> 매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>`;
    this.#form.append($linkTextBox);

    /*버튼*/
    const $buttonBox = document.createElement('div');
    $buttonBox.classList.add('button-container');
    const cancelButton = new BasicButton(false, '취소하기');
    const addButton = new BasicButton(true, '추가하기');
    $buttonBox.append(cancelButton);
    $buttonBox.append(addButton);

    this.#form.append($buttonBox);

    this.#form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (this.#form.elements.namedItem('name') as HTMLInputElement).value;
      const distance = (this.#form.elements.namedItem('distance') as HTMLInputElement).value;
      const category = (this.#form.elements.namedItem('category') as HTMLInputElement).value;
      const description = (this.#form.elements.namedItem('description') as HTMLInputElement).value;
      const link = (this.#form.elements.namedItem('link') as HTMLInputElement).value;

      console.log(distance);
      const newRestaurant: IRestaurant = {
        name,
        distance: Number(distance.slice(0, -3)), // TODO : '분 내'를 지우려고 3개없앴음. 야매로 해뒀음.
        category,
      };
      if (description) {
        newRestaurant.description = description;
      }
      if (link) {
        newRestaurant.link = link;
      }
      const DBService = new RestaurantDBService();
      DBService.add(newRestaurant);

      const selectElement = document.querySelector('.restaurant-filter-container');
      // Event 생성자를 사용하여 change 이벤트 객체를 생성합니다.
      const event = new Event('change', {
        bubbles: true, // 이벤트가 버블링되도록 설정
        cancelable: true, // 이벤트를 취소할 수 있도록 설정
      });
      // 엘리먼트에 change 이벤트를 디스패치합니다.
      selectElement?.dispatchEvent(event);
    });
  }

  #makeCategorySelectBox() {
    const $categorySelectBox = document.createElement('div');
    $categorySelectBox.classList.add('form-item', 'form-item--required');

    const $categoryLabel = document.createElement('label');
    $categoryLabel.setAttribute('for', 'category text-caption');
    $categoryLabel.textContent = '카테고리';
    $categorySelectBox.append($categoryLabel);

    const $categorySelect = new SelectBox(CATEGORIES_KEYS, 'category');
    $categorySelectBox.append($categorySelect);

    return $categorySelectBox;
  }
}
export default NewRestaurantModal;

customElements.define('new-restaurantmodal', NewRestaurantModal);
