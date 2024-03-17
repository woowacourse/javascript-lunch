export const getUrlParams = (paramKey: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramKey);
};

export const setUrlParams = (paramKey: string, paramValue: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(paramKey, paramValue);
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
};

export const deleteParams = (paramKey: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete(paramKey);
  window.history.replaceState({}, '', `${window.location.pathname}${urlParams}`);
};
