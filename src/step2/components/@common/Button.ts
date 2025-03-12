type ButtonStyle = 'primary' | 'secondary';

interface ButtonProps {
  style?: ButtonStyle;
  onClick?: () => void;
  children: string;
  className?: string;
}

export const Button = ({
  style = 'primary',
  onClick,
  children,
  className = '',
}: ButtonProps) => {
  const buttonClass = `button button--${style} ${className}`;

  return `
    <button 
      type="button"
      class="${buttonClass} text-caption"
      onclick="${onClick}"
    >${children}</button>
  `;
};

export default Button;
