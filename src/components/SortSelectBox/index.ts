import SelectBox from '../common/SelectBox';

const attributes = {
  name: 'sorting',
  id: 'sorting-filter',
  classList: ['restaurant-filter'],
};

const options = [
  { value: 'name', text: '이름순' },
  { value: 'distance', text: '거리순' },
];

export default class SortSelectBox extends SelectBox {
  constructor(targetElement: Element) {
    super(targetElement, attributes, options);
  }
}
