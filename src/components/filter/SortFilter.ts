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
        value: '최신순',
        textContent: '최신순',
      }),
      createDOMElement({
        tag: 'option',
        value: '이름순',
        textContent: '이름순',
      }),
      createDOMElement({
        tag: 'option',
        value: '거리순',
        textContent: '거리순',
      }),
    ],
  });
}

export default SortFilter;
