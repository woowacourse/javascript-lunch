interface throwErrorProps {
  condition: boolean;
  message: string;
}

const throwError = ({ condition, message }: throwErrorProps) => {
  if (condition) {
    throw new Error(message);
  }
};

export default throwError;
