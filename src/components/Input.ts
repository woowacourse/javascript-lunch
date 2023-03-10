import { Attribute } from '../types/ui';

class Input {
  private attributes: Attribute;

  constructor(attributes: Attribute) {
    this.attributes = attributes;
  }

  create() {
    return ` 
      <input
        type=${this.attributes.type} 
        name=${this.attributes.name}
        id=${this.attributes.id}
        required=${this.attributes.required}
      />`;
  }
}

export default Input;
