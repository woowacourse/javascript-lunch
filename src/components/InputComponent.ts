type Props = {
  type: string;
  name: string;
  isRequired?: boolean;
};

export function InputComponent({ type, name, isRequired = true }: Props) {
  const getTemplate = () => {
    return /*html*/ `
        <input type=${type} name=${name} id="name" ${isRequired ? 'required' : ''} />
        `;
  };

  return { getTemplate };
}

// component의 타입 정의해야될듯
// 1. getAttribute랑
// 2. getTemplate

// 3.
