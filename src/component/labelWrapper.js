function createLabelWrapper({
  className,
  htmlFor,
  description = '',
  name,
  innerElement,
}) {
  const wrapper = document.createElement('div');
  wrapper.className = className;

  const label = document.createElement('label');
  label.htmlFor = htmlFor;
  label.textContent = name;

  wrapper.append(label, innerElement);

  if (!description) return wrapper;

  const descriptionTag = document.createElement('span');
  descriptionTag.textContent = description;
  descriptionTag.className = 'help-text text-caption';

  wrapper.append(description);
  return wrapper;
}

export default createLabelWrapper;
