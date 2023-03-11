type ButtonType = 'button' | 'submit';

type ButtonInfo = {
  func: 'cancel' | 'remove' | 'add';
  buttonType: ButtonType;
  buttonStyle: string;
  buttonText: string;
};

export { ButtonType, ButtonInfo };
