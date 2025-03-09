import createElement from '../utils/createElement.js';

function createSectionContainer(className) {
  return createElement({ tag: 'section', className });
}

export default createSectionContainer;
