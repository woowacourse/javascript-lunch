interface ButtonProps {
  type: 'submit' | 'reset' | 'button';
  varient : 'gnb' | 'primary' | 'secondary';
  classnames?: string[];
  ariaLabel?: string;
  children: string | HTMLImageElement;
  disabled?: boolean;
}

export default ButtonProps;
