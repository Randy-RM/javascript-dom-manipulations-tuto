// script.js — fetch posts, show skeletons, then cards
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const postsContainer = document.getElementById("posts");
const errorEl = document.getElementById("error");
const refreshBtn = document.getElementById("refreshBtn");
const postModal = document.getElementById("postModal");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");
const closeModalBtn = document.getElementById("closeModalBtn");

// Contract:
// - inputs: none (fetches POSTS_URL)
// - outputs: renders cards for posts (title, body, id, userId)
// - error modes: network failure or non-2xx -> show message

// Create k skeleton cards
function showSkeletons(count = 6) {
  postsContainer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className =
      "animate-pulse p-5 bg-white border-t-4 border-gray-300 transition-all ease-in-out";
    s.innerHTML = `
      <div class="mb-3">
        <div class="h-5 bg-gray-200 w-3/4 mb-1"></div>
        <div class="h-3 bg-gray-200 w-1/3 mt-1"></div>
      </div>
      <div class="mt-2 space-y-2">
        <div class="h-3 bg-gray-200"></div>
        <div class="h-3 bg-gray-200"></div>
        <div class="h-3 bg-gray-200 w-5/6"></div>
      </div>
    `;
    postsContainer.appendChild(s);
  }
}

function createPostCard(post) {
  const el = document.createElement("article");
  el.className =
    "p-5 bg-white border-t-4 border-blue-500 hover:bg-gray-50 transition-all cursor-pointer";
  el.innerHTML = `
    <header class="mb-3">
      <h2 class="text-lg font-medium text-gray-800">${escapeHtml(
        post.title
      )}</h2>
      <div class="text-xs text-gray-600 mt-1 font-medium">Post #${
        post.id
      } • User ${post.userId}</div>
    </header>
    <p class="text-gray-700 mt-2 line-clamp-3 leading-relaxed">${escapeHtml(
      post.body
    )}</p>
  `;

  // Add click event to show modal
  el.addEventListener("click", () => showPostDetail(post));

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
    await new Promise((r) => setTimeout(r, 2000));

    postsContainer.innerHTML = "";
    posts.forEach((p) => postsContainer.appendChild(createPostCard(p)));
  } catch (err) {
    postsContainer.innerHTML = "";
    errorEl.textContent = "Erreur lors du chargement des posts: " + err.message;
    errorEl.classList.remove("hidden");
  }
}

// Show post detail in modal
function showPostDetail(post) {
  modalTitle.textContent = post.title;
  modalMeta.textContent = `Post #${post.id} • User ${post.userId}`;
  modalBody.textContent = post.body;

  const modalContent = document.getElementById("modalContent");

  // Remove hidden class and add fade-in animation
  postModal.classList.remove("hidden");
  postModal.classList.remove("modal-fade-out");
  postModal.classList.add("modal-fade-in");

  // Add scale animation to content
  modalContent.classList.remove("modal-content-out");
  modalContent.classList.add("modal-content-in");

  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Close modal
function hidePostDetail() {
  const modalContent = document.getElementById("modalContent");

  // Add fade-out animations
  postModal.classList.remove("modal-fade-in");
  postModal.classList.add("modal-fade-out");

  modalContent.classList.remove("modal-content-in");
  modalContent.classList.add("modal-content-out");

  // Wait for animation to complete before hiding
  setTimeout(() => {
    postModal.classList.add("hidden");
    postModal.classList.remove("modal-fade-out");
    modalContent.classList.remove("modal-content-out");
  }, 150);

  document.body.style.overflow = ""; // Restore scrolling
}

closeModal.addEventListener("click", hidePostDetail);
closeModalBtn.addEventListener("click", hidePostDetail);

// Close modal when clicking outside
postModal.addEventListener("click", (e) => {
  if (e.target === postModal) {
    hidePostDetail();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !postModal.classList.contains("hidden")) {
    hidePostDetail();
  }
});

refreshBtn.addEventListener("click", () => fetchPosts());

// Initial load
fetchPosts();
