export const isValidName = (name: string): boolean => {
  if (name.length <= 20 && name.length > 0) {
    return true;
  }

  return false;
};

export const isValidCategory = (category: string): boolean => {
  if (category !== undefined) {
    return true;
  }

  return false;
};

export const isValidDistance = (distance: string): boolean => {
  if (distance !== undefined) {
    return true;
  }

  return false;
};

export const isValidDescription = (description: string): boolean => {
  if (description.length < 50) {
    return true;
  }

  return false;
};

export const isValidLink = (link: string): boolean => {
  // 정규표현식: http://, https://, m., www. 으로 시작하는 문자열만 가능.
  if (link.length === 0 || /^(?:https?:\/\/|www.|m.)[\S]{1,30}$/.test(link)) {
    return true;
  }

  return false;
};
