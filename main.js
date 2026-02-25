import { fetchBooks } from './fetchBooks.js';
import { addFavorite, clearFavorites, getFavorites, isFavorite, removeFavorite } from './favorites.js';

const displayGrid = document.getElementById('display-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const loading = document.getElementById('loading');
const clearAllBtn = document.getElementById('clear-all');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function initApp() {
    initTheme();
    const path = window.location.pathname.toLowerCase();
    if (path.includes('favorites.html')) {
        initFavoritesPage();
    } else if (path.includes('about.html')) {
        return;
    } else {
        initHomePage();
    }
}

function initTheme() {
    const storedTheme = localStorage.getItem('book-finder-theme');
    if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        if (themeIcon) themeIcon.textContent = '☀️';
    }

    themeToggle?.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('book-finder-theme', isDark ? 'dark' : 'light');
    });
}

function initHomePage() {
    searchBtn?.addEventListener('click', () => {
        const query = searchInput.value.trim();
        handleSearch(query);
    });

    searchInput?.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') searchBtn?.click();
    });

    handleSearch('programming');
}

async function handleSearch(query) {
    setLoading(true);
    try {
        const books = await fetchBooks(query);
        renderBooks(books, false);
    } catch (error) {
        console.error(error);
        if (displayGrid) {
            displayGrid.innerHTML = `<p class="col-span-full rounded-xl border border-dashed border-rose-200 bg-rose-50 p-10 text-center text-sm text-rose-600">Could not load books. Please check your connection and try again.</p>`;
        }
    } finally {
        setLoading(false);
    }
}

function initFavoritesPage() {
    clearAllBtn?.addEventListener('click', () => {
        clearFavorites();
        renderFavorites();
    });

    renderFavorites();
}

function renderFavorites() {
    const favorites = getFavorites();
    renderBooks(favorites, true);
}

function renderBooks(books, isFavoritesPage) {
    if (!displayGrid) return;
    displayGrid.innerHTML = '';

    if (!books.length) {
        displayGrid.innerHTML = `<p class="col-span-full rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">No books to show yet.</p>`;
        return;
    }

    books.forEach((book) => {
        const card = document.createElement('article');
        card.className = 'rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-gray-800';
        card.innerHTML = `
            <div class="h-40 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden dark:bg-gray-700">
                <img src="${book.cover}" alt="${book.title}" class="h-full w-full object-cover">
            </div>
            <h3 class="mt-4 text-lg font-semibold truncate">${book.title}</h3>
            <p class="mt-1 text-sm text-slate-500 truncate dark:text-slate-300">${book.author}</p>
            <div class="mt-4 flex items-center justify-between text-xs text-slate-500">
                <button class="action-btn flex items-center gap-2 font-semibold text-blue-600 hover:underline dark:text-blue-400">
                    <span class="text-base">❤️</span>
                    <span>${isFavoritesPage ? 'REMOVE' : isFavorite(book.id) ? 'SAVED' : 'FAVORITE'}</span>
                </button>
                <a href="${book.preview || '#'}" target="_blank" rel="noreferrer"
                   class="rounded-lg bg-slate-100 px-3 py-1 font-semibold text-slate-700 hover:bg-slate-200 dark:bg-gray-700 dark:text-slate-200 dark:hover:bg-gray-600">
                    PREVIEW
                </a>
            </div>
        `;

        const actionBtn = card.querySelector('.action-btn');
        actionBtn?.addEventListener('click', () => {
            if (isFavoritesPage) {
                removeFavorite(book.id);
                renderFavorites();
                return;
            }

            if (!isFavorite(book.id)) {
                addFavorite(book);
                actionBtn.querySelector('span:last-child').textContent = 'SAVED';
            }
        });

        displayGrid.appendChild(card);
    });
}

function setLoading(isLoading) {
    if (!loading) return;
    loading.classList.toggle('hidden', !isLoading);
}
