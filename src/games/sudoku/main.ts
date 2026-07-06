import "./index.css";

import "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  window.location.hash ??= "#home";
});
