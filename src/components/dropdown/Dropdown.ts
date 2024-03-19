import './Dropdown.css';
import type { IOptionAttributes, IDropdownAttributes } from '@/types/dom';

import Component from '../core/Component';

import dom from '@/utils/dom';

interface IDropdown {
  $target: HTMLElement;
  props: IDropdownProps;
}

interface IDropdownProps {
  attributes: IDropdownAttributes;
  options: IOptionAttributes[];
  onSelect?: () => void;
}

class Dropdown extends Component<IDropdownProps> {
  constructor({ $target, props }: IDropdown) {
    super($target, props);
  }

  setEvent(): void {
    if (this.props.onSelect) this.$target.addEventListener('change', this.props.onSelect);
  }

  render(): void {
    const selectTag = this.getSelectTag();
    this.props.options.forEach(option => {
      const optionTag = dom.createOptionTag({ value: option.value, text: option.text });
      selectTag.appendChild(optionTag);
    });
    this.$target.appendChild(selectTag);
    this.$target = selectTag;
  }

  getSelectTag(): HTMLSelectElement {
    const { name, id, classNames, required } = this.props.attributes;
    return dom.createSelectTag({ name, id, classNames, required });
  }
}

export default Dropdown;
