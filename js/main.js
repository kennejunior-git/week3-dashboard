// Entry point: wires the modules together
import { fetchPosts } from "./api.js";
import { getAuthors, filterPosts, sortPosts, totalWords, longestPost } from "./data.js";
import { showLoading, showError, fillAuthors, renderPosts, renderStats } from "./ui.js";

const searchInput = document.getElementById("search");
const authorSelect = document.getElementById("author");
const sortSelect = document.getElementById("sort");

let allPosts = [];
let authorsFilled = false;

function update() {
  const filtered = filterPosts(allPosts, searchInput.value, authorSelect.value);
  const sorted = sortPosts(filtered, sortSelect.value);
  renderPosts(sorted);
  renderStats(sorted.length, totalWords(sorted), longestPost(sorted));
}

async function init() {
  showLoading();
  try {
    allPosts = await fetchPosts();
    if (!authorsFilled) {
      fillAuthors(getAuthors(allPosts));
      authorsFilled = true;
    }
    update();
  } catch (err) {
    showError(err.message, init);
  }
}

let timer;
searchInput.addEventListener("input", function () {
  clearTimeout(timer);
  timer = setTimeout(update, 200); // debounce typing
});
authorSelect.addEventListener("change", update);
sortSelect.addEventListener("change", update);

init();
