import createElement from '../utils/createElement.js';

function createSectionContainer(className, children) {
  const sectionContainer = createElement('section', className);

  sectionContainer.appendChild(children);

  return sectionContainer;
}

export default createSectionContainer;
