// Module 3: everything that touches the DOM
const grid = document.getElementById("grid");
const statusEl = document.getElementById("status");
const statsEl = document.getElementById("stats");
const authorSelect = document.getElementById("author");
const fmt = new Intl.NumberFormat("en-US");

export function showLoading() {
  grid.innerHTML = "";
  statsEl.innerHTML = "";
  statusEl.className = "status";
  statusEl.innerHTML = '<span class="spinner"></span>Loading posts…';
}

export function showError(message, onRetry) {
  grid.innerHTML = "";
  statusEl.className = "status error";
  statusEl.textContent = "Could not load data: " + message + ". ";
  const btn = document.createElement("button");
  btn.className = "retry";
  btn.textContent = "Try again";
  btn.addEventListener("click", onRetry);
  statusEl.appendChild(btn);
}

export function clearStatus() {
  statusEl.className = "status";
  statusEl.textContent = "";
}

export function fillAuthors(authors) {
  authors.forEach(function (a) {
    const opt = document.createElement("option");
    opt.value = a;
    opt.textContent = a;
    authorSelect.appendChild(opt);
  });
}

function addRow(dl, label, value) {
  const dt = document.createElement("dt");
  dt.textContent = label;
  const dd = document.createElement("dd");
  dd.textContent = value;
  dl.append(dt, dd);
}

function makeCard(p) {
  const card = document.createElement("article");
  card.className = "card";

  const body = document.createElement("div");
  body.className = "body";

  const h2 = document.createElement("h2");
  h2.textContent = p.title;

  const text = document.createElement("p");
  text.textContent = p.body;

  const dl = document.createElement("dl");
  addRow(dl, "Author", p.author);
  addRow(dl, "Company", p.company);
  addRow(dl, "City", p.city);
  addRow(dl, "Words", String(p.words));

  body.append(h2, text, dl);
  card.appendChild(body);
  return card;
}

export function renderPosts(list) {
  grid.innerHTML = "";
  if (!list.length) {
    statusEl.className = "status";
    statusEl.textContent = "No posts match your search. Try a different word or author.";
    return;
  }
  clearStatus();
  const frag = document.createDocumentFragment();
  list.forEach(function (p) { frag.appendChild(makeCard(p)); });
  grid.appendChild(frag);
}

export function renderStats(count, total, top) {
  statsEl.innerHTML = "";
  const parts = [
    ["Showing", count + " posts"],
    ["Total words", fmt.format(total)]
  ];
  if (top) parts.push(["Longest post", top.words + " words (#" + top.id + ")"]);
  parts.forEach(function (p) {
    const span = document.createElement("span");
    span.append(p[0] + ": ");
    const strong = document.createElement("strong");
    strong.textContent = p[1];
    span.appendChild(strong);
    statsEl.appendChild(span);
  });
}
