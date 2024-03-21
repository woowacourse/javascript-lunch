import dom from './dom';

const dropdown = {
  getSelectedValue<T>(selector: string): T {
    const $selectTag = dom.getElement<HTMLSelectElement>(selector);
    const options = $selectTag.options;
    return options[options.selectedIndex].text as T;
  },
};

export default dropdown;
