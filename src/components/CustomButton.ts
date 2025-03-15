interface ICustomButton {
  id?: string;
  type?: string;
  className?: string;
  text: string;
}

export default function CustomButton({
  id,
  type,
  className,
  text,
}: ICustomButton): string {
  return `
    <button 
      ${id && `id="${id}"`}
      ${type && `type="${type}"`}
      ${className && `class="button ${className} text-caption"`} 
    >
      ${text}
    </button>
  `;
}
