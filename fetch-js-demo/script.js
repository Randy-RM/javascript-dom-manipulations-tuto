// script.js — fetch posts, show skeletons, then cards

// Constants
const API_CONFIG = {
  BASE_URL: "https://jsonplaceholder.typicode.com/posts",
  SKELETON_DELAY: 500,
  ANIMATION_DELAY: 150
};

const PAGINATION_CONFIG = {
  POSTS_PER_PAGE: 6,
  SKELETON_COUNT: 6
};

// DOM Elements
const DOM = {
  postsContainer: document.getElementById("posts"),
  errorEl: document.getElementById("error"),
  refreshBtn: document.getElementById("refreshBtn"),
  paginationContainer: document.getElementById("pagination"),
  postModal: document.getElementById("postModal"),
  modalTitle: document.getElementById("modalTitle"),
  modalMeta: document.getElementById("modalMeta"),
  modalBody: document.getElementById("modalBody"),
  modalContent: document.getElementById("modalContent"),
  closeModal: document.getElementById("closeModal"),
  closeModalBtn: document.getElementById("closeModalBtn")
};

// Application State
let currentPage = 1;
let allPosts = [];

/**
 * Creates and displays skeleton loading cards
 * @param {number} count - Number of skeleton cards to display
 */
function showSkeletons(count = PAGINATION_CONFIG.SKELETON_COUNT) {
  clearPostsContainer();
  const skeletons = createSkeletonElements(count);
  appendElementsToContainer(DOM.postsContainer, skeletons);
}

/**
 * Creates skeleton card elements
 * @param {number} count - Number of skeletons to create
 * @returns {HTMLElement[]} Array of skeleton elements
 */
function createSkeletonElements(count) {
  const skeletons = [];
  for (let i = 0; i < count; i++) {
    skeletons.push(createSkeletonCard());
  }
  return skeletons;
}

/**
 * Creates a single skeleton card element
 * @returns {HTMLElement} Skeleton card element
 */
function createSkeletonCard() {
  const skeleton = document.createElement("div");
  skeleton.className =
    "animate-pulse p-5 bg-white border-t-4 border-gray-300 transition-all";
  skeleton.innerHTML = `
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
  return skeleton;
}

/**
 * Creates a post card element
 * @param {Object} post - Post data object
 * @returns {HTMLElement} Post card element
 */
function createPostCard(post) {
  const card = document.createElement("article");
  card.className =
    "p-5 bg-white border-t-4 border-blue-500 hover:bg-gray-50 transition-all cursor-pointer";
  card.innerHTML = getPostCardHTML(post);
  card.addEventListener("click", () => showPostDetail(post));
  return card;
}

/**
 * Generates HTML for a post card
 * @param {Object} post - Post data object
 * @returns {string} HTML string for post card
 */
function getPostCardHTML(post) {
  return `
    <header class="mb-3">
      <h2 class="text-lg font-medium text-gray-800">${escapeHtml(post.title)}</h2>
      <div class="text-xs text-gray-600 mt-1 font-medium">Post #${post.id} • User ${post.userId}</div>
    </header>
    <p class="text-gray-700 mt-2 line-clamp-3 leading-relaxed">${escapeHtml(post.body)}</p>
  `;
}

/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeHtml(str) {
  if (!str) return "";
  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return str.replace(/[&<>"']/g, char => htmlEntities[char]);
}

/**
 * Clears the posts container
 */
function clearPostsContainer() {
  DOM.postsContainer.innerHTML = "";
}

/**
 * Appends multiple elements to a container
 * @param {HTMLElement} container - Container element
 * @param {HTMLElement[]} elements - Elements to append
 */
function appendElementsToContainer(container, elements) {
  elements.forEach(element => container.appendChild(element));
}

/**
 * Hides the error message
 */
function hideError() {
  DOM.errorEl.classList.add("hidden");
}

/**
 * Handles fetch errors
 * @param {Error} error - Error object
 */
function handleFetchError(error) {
  clearPostsContainer();
  DOM.errorEl.textContent = `Erreur lors du chargement des posts: ${error.message}`;
  DOM.errorEl.classList.remove("hidden");
}

/**
 * Disables body scrolling
 */
function disableBodyScroll() {
  document.body.style.overflow = "hidden";
}

/**
 * Enables body scrolling
 */
function enableBodyScroll() {
  document.body.style.overflow = "";
}

/**
 * Fetches all posts from the API
 */
async function fetchPosts() {
  hideError();
  showSkeletons();
  
  try {
    const data = await fetchDataFromAPI();
    allPosts = validatePostsData(data);
    await simulateNetworkDelay();
    renderCurrentPage();
  } catch (error) {
    handleFetchError(error);
  }
}

/**
 * Fetches data from the API
 * @returns {Promise<Array>} Posts data
 */
async function fetchDataFromAPI() {
  const response = await fetch(API_CONFIG.BASE_URL);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

/**
 * Validates and returns posts data
 * @param {*} data - Data to validate
 * @returns {Array} Validated posts array
 */
function validatePostsData(data) {
  return Array.isArray(data) ? data : [];
}

/**
 * Simulates network delay for skeleton visibility
 * @returns {Promise<void>}
 */
function simulateNetworkDelay() {
  return new Promise((resolve) => setTimeout(resolve, API_CONFIG.SKELETON_DELAY));
}

/**
 * Renders posts for the current page
 */
function renderCurrentPage() {
  const posts = getPostsForCurrentPage();
  clearPostsContainer();
  renderPosts(posts);
  renderPagination();
}

/**
 * Gets posts for the current page
 * @returns {Array} Posts for current page
 */
function getPostsForCurrentPage() {
  const startIndex = (currentPage - 1) * PAGINATION_CONFIG.POSTS_PER_PAGE;
  const endIndex = startIndex + PAGINATION_CONFIG.POSTS_PER_PAGE;
  return allPosts.slice(startIndex, endIndex);
}

/**
 * Renders an array of posts
 * @param {Array} posts - Posts to render
 */
function renderPosts(posts) {
  const postCards = posts.map(createPostCard);
  appendElementsToContainer(DOM.postsContainer, postCards);
}

/**
 * Renders pagination controls
 */
function renderPagination() {
  const totalPages = getTotalPages();
  if (totalPages <= 1) {
    DOM.paginationContainer.innerHTML = "";
    return;
  }
  
  DOM.paginationContainer.innerHTML = getPaginationHTML(totalPages);
  attachPaginationEventListeners();
}

/**
 * Calculates total number of pages
 * @returns {number} Total pages
 */
function getTotalPages() {
  return Math.ceil(allPosts.length / PAGINATION_CONFIG.POSTS_PER_PAGE);
}

/**
 * Generates pagination HTML
 * @param {number} totalPages - Total number of pages
 * @returns {string} Pagination HTML
 */
function getPaginationHTML(totalPages) {
  const buttons = [];
  
  buttons.push(getPaginationButton('prev', 'Précédent', currentPage === 1));
  
  for (let i = 1; i <= totalPages; i++) {
    buttons.push(getPaginationPageButton(i, currentPage === i));
  }
  
  buttons.push(getPaginationButton('next', 'Suivant', currentPage === totalPages));
  
  return `<div class="flex justify-center gap-2 mt-8">${buttons.join('')}</div>`;
}

/**
 * Creates a pagination button HTML
 * @param {string} type - Button type (prev/next)
 * @param {string} label - Button label
 * @param {boolean} isDisabled - Whether button is disabled
 * @returns {string} Button HTML
 */
function getPaginationButton(type, label, isDisabled) {
  const disabledClass = isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600';
  return `
    <button 
      class="px-4 py-2 bg-blue-500 text-white font-medium transition-colors ${disabledClass}" 
      data-page="${type}"
      ${isDisabled ? 'disabled' : ''}>
      ${label}
    </button>
  `;
}

/**
 * Creates a page number button HTML
 * @param {number} pageNum - Page number
 * @param {boolean} isCurrent - Whether this is the current page
 * @returns {string} Button HTML
 */
function getPaginationPageButton(pageNum, isCurrent) {
  const activeClass = isCurrent 
    ? 'bg-blue-600 font-bold' 
    : 'bg-blue-500 hover:bg-blue-600';
  return `
    <button 
      class="px-4 py-2 text-white font-medium transition-colors ${activeClass}" 
      data-page="${pageNum}">
      ${pageNum}
    </button>
  `;
}

/**
 * Attaches event listeners to pagination buttons
 */
function attachPaginationEventListeners() {
  const buttons = DOM.paginationContainer.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', handlePaginationClick);
  });
}

/**
 * Handles pagination button click
 * @param {Event} event - Click event
 */
function handlePaginationClick(event) {
  const pageValue = event.target.dataset.page;
  
  if (pageValue === 'prev' && currentPage > 1) {
    currentPage--;
  } else if (pageValue === 'next' && currentPage < getTotalPages()) {
    currentPage++;
  } else if (!isNaN(pageValue)) {
    currentPage = parseInt(pageValue);
  }
  
  renderCurrentPage();
  scrollToTop();
}

/**
 * Scrolls to the top of the page
 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Shows post detail in modal
 * @param {Object} post - Post data object
 */
function showPostDetail(post) {
  setModalContent(post);
  animateModalOpen();
  disableBodyScroll();
}

/**
 * Sets modal content with post data
 * @param {Object} post - Post data object
 */
function setModalContent(post) {
  DOM.modalTitle.textContent = post.title;
  DOM.modalMeta.textContent = `Post #${post.id} • User ${post.userId}`;
  DOM.modalBody.textContent = post.body;
}

/**
 * Animates modal opening
 */
function animateModalOpen() {
  DOM.postModal.classList.remove("hidden", "modal-fade-out");
  DOM.postModal.classList.add("modal-fade-in");
  DOM.modalContent.classList.remove("modal-content-out");
  DOM.modalContent.classList.add("modal-content-in");
}

/**
 * Closes the modal with animation
 */
function hidePostDetail() {
  animateModalClose();
  scheduleModalHide();
  enableBodyScroll();
}

/**
 * Animates modal closing
 */
function animateModalClose() {
  DOM.postModal.classList.remove("modal-fade-in");
  DOM.postModal.classList.add("modal-fade-out");
  DOM.modalContent.classList.remove("modal-content-in");
  DOM.modalContent.classList.add("modal-content-out");
}

/**
 * Schedules modal hiding after animation
 */
function scheduleModalHide() {
  setTimeout(() => {
    DOM.postModal.classList.add("hidden");
    cleanupModalClasses();
  }, API_CONFIG.ANIMATION_DELAY);
}

/**
 * Removes animation classes from modal
 */
function cleanupModalClasses() {
  DOM.postModal.classList.remove("modal-fade-out");
  DOM.modalContent.classList.remove("modal-content-out");
}

/**
 * Handles click outside modal
 * @param {Event} event - Click event
 */
function handleModalOutsideClick(event) {
  if (event.target === DOM.postModal) {
    hidePostDetail();
  }
}

/**
 * Handles escape key press
 * @param {Event} event - Keyboard event
 */
function handleEscapeKey(event) {
  const isModalOpen = !DOM.postModal.classList.contains("hidden");
  if (event.key === "Escape" && isModalOpen) {
    hidePostDetail();
  }
}

/**
 * Handles refresh button click
 */
function handleRefreshClick() {
  currentPage = 1;
  fetchPosts();
}

/**
 * Initializes all event listeners
 */
function initializeEventListeners() {
  DOM.closeModal.addEventListener("click", hidePostDetail);
  DOM.closeModalBtn.addEventListener("click", hidePostDetail);
  DOM.postModal.addEventListener("click", handleModalOutsideClick);
  document.addEventListener("keydown", handleEscapeKey);
  DOM.refreshBtn.addEventListener("click", handleRefreshClick);
}

/**
 * Initializes the application
 */
function initializeApp() {
  initializeEventListeners();
  fetchPosts();
}

// Start application
initializeApp();
