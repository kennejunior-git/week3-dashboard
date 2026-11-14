# week3-dashboard

An API-driven mini dashboard built with plain HTML, CSS and JavaScript (ES modules).

## API used
[JSONPlaceholder](https://jsonplaceholder.typicode.com/) (no key needed):
- `GET /posts` – 100 posts (id, title, body, userId)
- `GET /users` – 10 users (name, company, city), joined to the posts by `userId`

## Features
- Fetches both endpoints with `async/await` and `Promise.all`, and checks `response.ok`
- Each card shows title, text, author, company, city and word count (3+ fields)
- Search box (title, text or author), author filter and sort
- Loading spinner and error message with a "Try again" button
- Array methods: `map`, `filter`, `reduce` (total words), `sort`, `find`
- ES modules: `api.js`, `data.js`, `ui.js`, `main.js`

## How to run
ES modules do not work from `file://`, so serve the folder locally:
1. VS Code **Live Server** (Go Live), or
2. `python -m http.server 8000` in this folder, then open http://localhost:8000

## Screenshot
_Add one screenshot here (e.g. `screenshot.png`) before submitting._
