document.addEventListener('DOMContentLoaded', () => {
  const mainMenu = document.getElementById('mainMenu');
  const ext1 = document.getElementById('ext1');
  const shortcuts = document.getElementById('shortcutsSection');
  const calculator = document.getElementById('calculatorSection');

  function hideAll() {
    ext1.style.display = 'none';
    shortcuts.style.display = 'none';
    calculator.style.display = 'none';
  }

  document.getElementById('btn-audio').addEventListener('click', () => {
    mainMenu.style.display = 'none';
    hideAll();
    ext1.style.display = 'block';
  });

  document.getElementById('btn-shortcuts').addEventListener('click', () => {
    mainMenu.style.display = 'none';
    hideAll();
    shortcuts.style.display = 'block';
  });

  document.getElementById('btn-calculator').addEventListener('click', () => {
    mainMenu.style.display = 'none';
    hideAll();
    calculator.style.display = 'block';
  });

  // ✅ Novo botão para abrir site externo
  document.getElementById('btn-coletores').addEventListener('click', () => {
    window.open('https://coletores-site.vercel.app/', '_blank');
  });
});
