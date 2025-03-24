const storageUtil = {
  add(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },
};

export default storageUtil;
