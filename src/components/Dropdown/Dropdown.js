import createDOMElement from '../../util/createDomElement.js';

const Dropdown = ({ id, name, className, options, onChange }) => {
  return createDOMElement({
    tag: 'select',
    id,
    name,
    className,
    onChange,
    children: options.map((option) =>
      createDOMElement({
        tag: 'option',
        value: option,
        textContent: option
      })
    )
  });
};

export default Dropdown;
