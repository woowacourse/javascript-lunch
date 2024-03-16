export interface Props {
  optionData: Record<string, string>;
}

export const createOptionArray = ({ optionData }: Props) => {
  const $optionArray = Object.entries(optionData).map(([key, value]) => {
    const $option = document.createElement('option');

    $option.value = key;
    $option.text = value;

    return $option;
  });

  return $optionArray;
};
