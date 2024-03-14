let idCounter = 0;

const generateID = () => {
  idCounter = idCounter + 1;
  return idCounter;
};

const useId = () => {
  const id = generateID();
  return id;
};

export default useId;
