import { FormComponentPropsType } from '../../types/components';

function Form({ id, className }: FormComponentPropsType) {
  const form = Object.assign(document.createElement('form'), {
    id,
    className,
  });

  return form;
}

export default Form;
