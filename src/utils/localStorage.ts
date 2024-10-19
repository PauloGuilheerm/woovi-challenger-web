export const setLocalStorage = (key: string, value: string) => {
    window.localStorage.setItem(key, value);
};

export const removeLocalStorage = (key: string) => {
    window.localStorage.removeItem(key);
};

export const getLocalStorage = (key: string) => window.localStorage.getItem(key);