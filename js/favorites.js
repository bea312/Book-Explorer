const btn = document.getElementById("mobile-menu-btn");
const menu = document.getElementById("mobile-menu");
if (btn && menu) {
  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
}
document.addEventListener("DOMContentLoaded", () => {
  renderFavorites();
});

function renderFavorites() {
  const favoritesGrid = document.getElementById("favorites-grid");
  
  let favorites = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
  
  if (favorites.length === 0) {
    favoritesGrid.innerHTML = `
            <div class="col-span-full text-center py-20 glass rounded-2xl">
                <p class="text-2xl text-slate-700 font-semibold mb-4">You haven't added any books to your favorites yet!</p>
                <a href="index.html" class="inline-block px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition shadow-md font-medium">
                    Explore Books
                </a>
            </div>
        `;
    return;
  }

  const html = favorites
    .map((book) => {
      return `
        <div class="glass glass-hover rounded-2xl overflow-hidden relative group flex flex-col">
            <div class="h-72 overflow-hidden relative flex justify-center items-center bg-slate-100 p-4">
                <img src="${book.image}" loading="lazy" alt="${book.title}" class="h-full object-cover rounded-lg shadow-md group-hover:scale-105 transition duration-500">
            </div>

            <div class="p-5 flex-grow flex flex-col justify-between">
                <div>
                    <h3 class="text-lg font-bold text-slate-800 leading-tight mb-1 line-clamp-2">${book.title}</h3>
                    <p class="text-slate-600 text-sm mb-2">by ${book.author}</p>
                </div>
                
                <button onclick="removeFromFavorites('${book.id}')" 
                    class="mt-4 w-full py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition flex justify-center items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Remove
                </button>
            </div>
        </div>
        `;
    })
    .join("");

  favoritesGrid.innerHTML = html;
}

window.removeFromFavorites = function (id) {
  let favorites = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
  
  favorites = favorites.filter((book) => book.id !== id);

  localStorage.setItem("favoriteBooks", JSON.stringify(favorites));

  renderFavorites();
};
