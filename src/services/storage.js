export default function getCurrentUser() {
  // return `${JSON.parsetlocalStorage.getItem("currIentUser")}`;
  return localStorage.getItem('currentUser');
}
/**
 *
 * @param {string} key
 * @returns {Array}
 */
export function getData(key) {
  const localStorageData = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : [];
  return localStorageData;
}

export function setLocalStorage(value) {
  return localStorage.setItem(getCurrentUser(), JSON.stringify(value));
}
