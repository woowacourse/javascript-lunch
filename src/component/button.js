function createButton({ type, name, parent, callback, classNames }) {
  const button = render({ type, classNames, name });
  if(!parent) return button;
  
  $(parent).innerHTML += button;

  if(!callback) return button;
  
  button.addEventListener(type, (event) => {
    event.preventDefault();
    callback();
  });

  return button;
}

function render({ type, classNames, name }) {
  const button = document.createElement("button");
  button.type = type;
  button.className = classNames.join(" ");
  button.textContent = name;

  return button;
}

