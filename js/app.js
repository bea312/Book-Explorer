
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const bookGrid = document.getElementById("book-grid");
const loadingIndicator = document.getElementById("loading-indicator");

document.addEventListener("DOMContentLoaded", () => {
  fetchBooks("fiction");
});

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) fetchBooks(query);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) fetchBooks(query);
  }
});

async function fetchBooks(query) {
  loadingIndicator.classList.remove("hidden");
  bookGrid.innerHTML = "";

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${query}&limit=8&fields=key,title,author_name,cover_i,first_publish_year`,
    );
    const data = await response.json();

    if (data.docs.length === 0) {
      bookGrid.innerHTML = `
                <div class="col-span-full text-center py-10 glass rounded-2xl">
                    <p class="text-2xl text-amber-700 font-semibold mb-2">No results found for "${query}"</p>
                    <p class="text-slate-600">Please try searching with a different title or author.</p>
                </div>`;
      return;
    }

    renderBooks(data.docs);
  } catch (error) {
    console.error("API Error:", error);
    bookGrid.innerHTML = `<p class="col-span-full text-center text-xl text-red-500 glass py-10 rounded-2xl">Failed to load data. Please check your connection.</p>`;
  } finally {
    loadingIndicator.classList.add("hidden");
  }
}

function renderBooks(books) {
  const html = books
    .map((book) => {
      const title = book.title;
      const author = book.author_name ? book.author_name[0] : "Unknown Author";

      const coverImg = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400";

      const safeTitle = title.replace(/'/g, "\\'");

      return `
        <div class="glass glass-hover rounded-2xl overflow-hidden relative group flex flex-col">
            <div class="h-72 overflow-hidden relative flex justify-center items-center bg-slate-100 p-4">
                <img src="${coverImg}" loading="lazy" alt="${title}" class="h-full object-cover rounded-lg shadow-md group-hover:scale-105 transition duration-500">
            </div>

            <div class="p-5 flex-grow flex flex-col justify-between">
                <div>
                    <h3 class="text-lg font-bold text-slate-800 leading-tight mb-1 line-clamp-2">${title}</h3>
                    <p class="text-slate-600 text-sm mb-2">by ${author}</p>
                </div>
                
                <button onclick="addToFavorites('${book.key}', '${safeTitle}', '${author}', '${coverImg}')" 
                    class="mt-4 w-full py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-sm font-medium transition flex justify-center items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.312-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    Add to Favorites
                </button>
            </div>
        </div>
        `;
    })
    .join("");

  bookGrid.innerHTML = html;
}

window.addToFavorites = function (id, title, author, image) {
    
  let favorites = JSON.parse(localStorage.getItem("favoriteBooks")) || [];

  const isExist = favorites.find((book) => book.id === id);

  if (!isExist) {
    
    favorites.push({ id, title, author, image });

    localStorage.setItem("favoriteBooks", JSON.stringify(favorites));

    alert(`"${title}" added to your favorites!`);
  } else {
    alert(`"${title}" is already in your favorites!`);
  }
};
const btn = document.getElementById("mobile-menu-btn");
const menu = document.getElementById("mobile-menu");
if (btn && menu) {
  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
}