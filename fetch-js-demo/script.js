// script.js — fetch posts, show skeletons, then cards
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const postsContainer = document.getElementById("posts");
const errorEl = document.getElementById("error");
const refreshBtn = document.getElementById("refreshBtn");

// Contract:
// - inputs: none (fetches POSTS_URL)
// - outputs: renders cards for posts (title, body, id, userId)
// - error modes: network failure or non-2xx -> show message

// Create k skeleton cards
function showSkeletons(count = 6) {
  postsContainer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "animate-pulse p-4 bg-white rounded shadow";
    s.innerHTML = `
      <div class="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div class="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div class="space-y-2">
        <div class="h-3 bg-gray-200 rounded"></div>
        <div class="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
    `;
    postsContainer.appendChild(s);
  }
}

function createPostCard(post) {
  const el = document.createElement("article");
  el.className =
    "p-4 bg-white rounded shadow hover:shadow-lg transition-shadow";
  el.innerHTML = `
    <header class="mb-2">
      <h2 class="text-lg font-semibold text-gray-800">${escapeHtml(
        post.title
      )}</h2>
      <div class="text-xs text-gray-500">Post #${post.id} • user ${
    post.userId
  }</div>
    </header>
    <p class="text-gray-700 mt-2">${escapeHtml(post.body)}</p>
  `;
  return el;
}

// Simple helper to avoid HTML injection for this demo
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function fetchPosts(limit = 9) {
  errorEl.classList.add("hidden");
  showSkeletons(6);
  try {
    const res = await fetch(POSTS_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    // take first `limit` posts
    const posts = Array.isArray(data) ? data.slice(0, limit) : [];

    // small artificial delay so skeletons are visible in fast networks
    await new Promise((r) => setTimeout(r, 500));

    postsContainer.innerHTML = "";
    posts.forEach((p) => postsContainer.appendChild(createPostCard(p)));
  } catch (err) {
    postsContainer.innerHTML = "";
    errorEl.textContent = "Erreur lors du chargement des posts: " + err.message;
    errorEl.classList.remove("hidden");
  }
}

refreshBtn.addEventListener("click", () => fetchPosts());

// Initial load
fetchPosts();
