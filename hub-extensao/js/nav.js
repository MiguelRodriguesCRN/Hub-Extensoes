document.addEventListener('DOMContentLoaded', () => {
  const mainMenu = document.getElementById('mainMenu');
  const ext1 = document.getElementById('ext1');
  const shortcuts = document.getElementById('shortcutsSection');
  const calculator = document.getElementById('calculatorSection');
  const csvSection = document.getElementById('csvSection'); // Nova seção

  function hideAll() {
    ext1.classList.add('hidden');
    shortcuts.classList.add('hidden');
    calculator.classList.add('hidden');
    csvSection.classList.add('hidden'); // Esconde a nova extensão
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

  document.getElementById('btn-csv').addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    hideAll();
    csvSection.classList.remove('hidden');
  });

  // Botão para abrir site externo
  document.getElementById('btn-coletores').addEventListener('click', () => {
    const link = 'https://coletores-site.vercel.app/';
    navigator.clipboard.writeText(link)
      .then(() => {
        alert('Link copiado para a área de transferência! ✅');
      })
      .catch(err => {
        console.error('Erro ao copiar o link: ', err);
      });
  });

  // Botão de voltar reutilizável para todas as seções
  document.querySelectorAll('.btn-voltar').forEach(button => {
    button.addEventListener('click', (e) => {
      const currentSection = e.target.closest('#ext1, #shortcutsSection, #calculatorSection, #csvSection');
      if (currentSection) {
        currentSection.classList.add('hidden');
      }
      mainMenu.classList.remove('hidden');
    });
  });
});
