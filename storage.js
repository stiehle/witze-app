const LOCAL_STORAGE_KEY = "joke-app-favorites";

export function saveToLocalStorage(jokes) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(jokes));
}

export function getRatedJokes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}
