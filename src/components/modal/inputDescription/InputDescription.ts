import inputDescriptionHandler from './eventHandlers';
import renderDescriptionComponent from './renderHandlers';

function InputDescription() {
  const inputDescription = renderDescriptionComponent();

  // inputDescriptionHandler();

  return inputDescription;
}

export default InputDescription;
