// js/atalhos.js
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.category-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const list = btn.nextElementSibling;
      list.style.display = list.style.display === 'block' ? 'none' : 'block';
    });
  });

  document.querySelectorAll('.copyButton').forEach(button => {
    button.addEventListener('click', function () {
      const text = this.dataset.text;
      navigator.clipboard.writeText(text).then(() => {
        const feedback = document.createElement('span');
        feedback.textContent = 'Copiado!';
        feedback.style.color = 'green';
        feedback.style.marginLeft = '10px';
        this.parentElement.appendChild(feedback);
        setTimeout(() => feedback.remove(), 2000);
      });
    });
  });
});
