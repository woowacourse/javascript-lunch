const Button = {
  create(information) {
    const button = document.createElement('button');

    button.setAttribute('id', `${information.id}`);
    button.setAttribute('type', `${information.type}`);
    button.classList.add('button', `${information.buttonOrder}`, 'text-caption');

    button.textContent = `${information.text}`;

    return button;
  },
};

export default Button;
