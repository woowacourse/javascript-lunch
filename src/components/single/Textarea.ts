import setAttributes from '../../utils/setAttributes';

interface Props {
  textarea?: {
    id?: string;
    name?: string;
    class?: string;
    cols?: string;
    rows?: string;
  };
}

export const createTextarea = ({ textarea }: Props): HTMLElement => {
  const $textarea = document.createElement('textarea');
  setAttributes($textarea, textarea);

  return $textarea;
};
