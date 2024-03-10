interface ButtonProps {
  type: 'submit' | 'reset' | 'button';
  classnames: string[];
  ariaLabel?: string;
  children: string | HTMLImageElement;
  disabled?: boolean;
}

export default ButtonProps;
