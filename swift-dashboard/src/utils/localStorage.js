export const saveState = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const loadState = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
  