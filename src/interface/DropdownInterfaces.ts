interface DropdownOption {
  value: string;
  content: string;
}

interface DropdownProps {
  options: DropdownOption[];
  name?: string;
  id?: string;
  className?: string;
  isRequired: boolean;
}

export { DropdownOption, DropdownProps };
