const STORAGE_KEY = 'book-explorer-favorites';

export function getFavorites() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function addFavorite(book) {
    const favorites = getFavorites();
    if (!favorites.find((item) => item.id === book.id)) {
        favorites.push(book);
        saveFavorites(favorites);
    }
}

export function removeFavorite(bookId) {
    const favorites = getFavorites().filter((book) => book.id !== bookId);
    saveFavorites(favorites);
}

export function clearFavorites() {
    localStorage.removeItem(STORAGE_KEY);
}

export function isFavorite(bookId) {
    return getFavorites().some((book) => book.id === bookId);
}
