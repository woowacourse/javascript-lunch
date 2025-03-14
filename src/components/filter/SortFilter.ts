import createDOMElement from '../../util/createDomElement';

function SortFilter() {
  return createDOMElement({
    tag: 'select',
    name: 'sorting',
    id: 'sorting-filter',
    class: 'restaurant-filter',
    children: [
      createDOMElement({
        tag: 'option',
        value: 'latest',
        textContent: '최신순',
      }),
      createDOMElement({
        tag: 'option',
        value: 'name',
        textContent: '이름순',
      }),
      createDOMElement({
        tag: 'option',
        value: 'distance',
        textContent: '거리순',
      }),
    ],
  });
}

export default SortFilter;
