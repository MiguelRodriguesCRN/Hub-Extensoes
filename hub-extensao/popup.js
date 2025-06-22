function showExtension(id) {
  const sections = document.querySelectorAll(".ext-content");
  sections.forEach(section => {
    section.style.display = "none";
  });
  const target = document.getElementById(id);
  if (target) {
    target.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-audio").addEventListener("click", () => {
    showExtension("ext1");
  });
  document.getElementById("btn-tools").addEventListener("click", () => {
    showExtension("ext2");
  });
});
