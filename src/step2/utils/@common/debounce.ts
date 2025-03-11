export const debounce = (callback: () => void) => {
  let id = -1;

  return () => {
    cancelAnimationFrame(id);

    id = requestAnimationFrame(callback);
  };
};
