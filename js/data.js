// Module 2: pure array-method helpers (no DOM here)

export function getAuthors(posts) {
  const unique = Array.from(new Set(posts.map(function (p) { return p.author; })));
  return unique.sort();
}

export function filterPosts(posts, text, author) {
  const q = text.trim().toLowerCase();
  return posts.filter(function (p) {
    const matchesAuthor = author === "all" || p.author === author;
    const matchesText =
      p.title.toLowerCase().includes(q) ||
      p.body.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q);
    return matchesAuthor && matchesText;
  });
}

export function sortPosts(posts, mode) {
  const copy = posts.slice(); // never mutate the original
  if (mode === "words-desc") copy.sort(function (a, b) { return b.words - a.words; });
  else if (mode === "words-asc") copy.sort(function (a, b) { return a.words - b.words; });
  else copy.sort(function (a, b) { return a.title.localeCompare(b.title); });
  return copy;
}

export function totalWords(posts) {
  return posts.reduce(function (sum, p) { return sum + p.words; }, 0);
}

export function longestPost(posts) {
  if (!posts.length) return null;
  const max = Math.max.apply(null, posts.map(function (p) { return p.words; }));
  return posts.find(function (p) { return p.words === max; });
}
