// Module 1: everything that talks to the API (JSONPlaceholder, no key needed)
const BASE = "https://jsonplaceholder.typicode.com";

async function getJSON(path) {
  const response = await fetch(BASE + path);
  if (!response.ok) {
    throw new Error("Server responded with status " + response.status);
  }
  return response.json();
}

// Fetch posts and users together, then join them into one simple shape
export async function fetchPosts() {
  const [posts, users] = await Promise.all([getJSON("/posts"), getJSON("/users")]);
  return posts.map(function (p) {
    const user = users.find(function (u) { return u.id === p.userId; });
    return {
      id: p.id,
      title: p.title,
      body: p.body.replace(/\n/g, " "),
      author: user ? user.name : "Unknown",
      company: user ? user.company.name : "N/A",
      city: user ? user.address.city : "N/A",
      words: p.body.split(/\s+/).filter(Boolean).length
    };
  });
}
