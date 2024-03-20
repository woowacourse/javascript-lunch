import setAttributes from '../../utils/setAttributes';

type Props = {
  input?: {
    id?: string;
    name?: string;
    class?: string;
    type?: string;
  };
};

export const Input = ({ input }: Props): HTMLElement => {
  const $input = document.createElement('input');
  setAttributes($input, input);

  return $input;
};
