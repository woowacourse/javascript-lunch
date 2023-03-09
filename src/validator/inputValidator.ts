export const isValidName = (name: string): boolean => {
  if (name.length <= 20 && name.length > 0) {
    return true;
  }

  return false;
};

export const isValidCategory = (category: string): boolean => {
  if (category !== '') {
    return true;
  }

  return false;
};

export const isValidDistance = (distance: string): boolean => {
  if (distance !== '') {
    return true;
  }

  return false;
};
