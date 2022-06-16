export function getLocalStorage(key: string) {
  const value = localStorage.getItem(key);
  return !!value ? JSON.parse(value) : false;
}

export function setLocalStorage(key: string, value: any) {
  value && localStorage.setItem(key, JSON.stringify(value));
}
