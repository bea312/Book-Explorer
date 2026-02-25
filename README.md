# Book Explorer (Book Finder Pro)

A simple multi-page web app for searching books, previewing results, and saving favorites. Built with HTML, Tailwind CSS, and Vanilla JavaScript modules using the Open Library API.

## Pages
- `index.html` — Home (search + results)
- `favorites.html` — Favorites (saved books)
- `about.html` — About this project

## Project Structure
- `index.html` — Search UI and results grid
- `favorites.html` — Favorites UI and saved list
- `about.html` — Project overview
- `main.js` — UI controller (events, rendering, page logic)
- `fetchBooks.js` — Open Library API calls
- `favorites.js` — localStorage helpers

## How It Works
1. Users search for books on the Home page.
2. Results are fetched from Open Library and shown as cards.
3. Clicking **Favorite** saves a book to localStorage.
4. Favorites page reads localStorage and displays saved books.

## Running the Project
This project uses ES6 modules, so it must be served by a local server.

Recommended:
1. Open the folder in VS Code.
2. Install the **Live Server** extension.
3. Right‑click `index.html` and choose **Open with Live Server**.

## Labs (Learning Plan)
1. **Lab 1** — Responsive layout (navbar, hero, grid, footer).
2. **Lab 2** — Interactivity with JS modules and event listeners.
3. **Lab 3** — Real API data with loading + empty states.
4. **Lab 4** — GitHub collaboration workflow (branches, PRs, boards).

## API
Data comes from Open Library:
- Search: `https://openlibrary.org/search.json?q=QUERY`
- Covers: `https://covers.openlibrary.org/b/id/COVER_ID-M.jpg`

## Branch Plan (Example)
- `feature/search` — Search UI + API logic
- `feature/favorites` — Favorites UI + localStorage logic

---
Built for learning and practice.
