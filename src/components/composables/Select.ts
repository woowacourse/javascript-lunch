import { OptionElementPropsType, SelectComponentPropsType } from '../../types/components';

const createSelectElement = ({ id, name, className, required }: Partial<SelectComponentPropsType>) =>
  Object.assign(document.createElement('select'), {
    id,
    name,
    className,
    required,
  });

const createOptionElements = ({ select, options, defaultValue }: OptionElementPropsType) => {
  options.forEach(({ value, text }) =>
    select.add(
      Object.assign(new Option(text, value), {
        selected: value === defaultValue,
      }),
    ),
  );
};

function Select({ id, name, className, options, defaultValue, required }: SelectComponentPropsType) {
  const select = createSelectElement({ id, name, className, required });

  createOptionElements({ select, options, defaultValue });

  return select;
}

export default Select;
