document.addEventListener('DOMContentLoaded', () => {
  const mainMenu = document.getElementById('mainMenu');
  const ext1 = document.getElementById('ext1');
  const shortcuts = document.getElementById('shortcutsSection');
  const calculator = document.getElementById('calculatorSection');

  function hideAll() {
    ext1.classList.add('hidden');
    shortcuts.classList.add('hidden');
    calculator.classList.add('hidden');
  }

  document.getElementById('btn-audio').addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    hideAll();
    ext1.classList.remove('hidden');
  });

  document.getElementById('btn-shortcuts').addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    hideAll();
    shortcuts.classList.remove('hidden');
  });

  document.getElementById('btn-calculator').addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    hideAll();
    calculator.classList.remove('hidden');
  });

  

  // Botão para abrir site externo
  document.getElementById('btn-coletores').addEventListener('click', () => {
    window.open('https://coletores-site.vercel.app/', '_blank');
  });

  // Botão de voltar reutilizável para todas as seções
  document.querySelectorAll('.btn-voltar').forEach(button => {
    button.addEventListener('click', (e) => {
      // Encontra a seção pai mais próxima (que tem as divs que estamos mostrando/ocultando)
      const currentSection = e.target.closest('#ext1, #shortcutsSection, #calculatorSection');
      if (currentSection) {
        currentSection.classList.add('hidden');
      }
      mainMenu.classList.remove('hidden');
    });
  });
});
