import { Attribute } from '../types/ui';

function createInput(attributes: Attribute) {
  return ` 
    <input
      type=${attributes.type} 
      name=${attributes.name}
      id=${attributes.id}
      required=${attributes.required}
    />`;
}

export { createInput };
