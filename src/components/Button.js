const Button = {
  createButtonContainer(informations) {
    const $buttonContainer = document.createElement('div');

    $buttonContainer.classList('button-container');

    informations.forEach(information => {
      $buttonContainer.appendChild(this.createButton(information));
    });
  },

  createButton(information) {
    const $button = document.createElement('button');

    $button.setAttribute('id', `${information.id}`);
    $button.setAttribute('type', 'button');
    $button.classList('button', `${information.buttonOrder}`, 'text-caption');

    $button.textContent = `${information.text}`;

    return $button;
  },
};

export default Button;
