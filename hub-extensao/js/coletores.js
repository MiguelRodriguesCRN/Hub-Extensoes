const copyButton = document.getElementById('linkColetores');

  // Adiciona o evento de clique
  copyButton.addEventListener('click', () => {
    const link = 'https://coletores-site.vercel.app/';
    
    // Usa a API Clipboard para copiar o texto
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copiado para a área de transferência!');
    }).catch(err => {
      alert('Erro ao copiar o link: ', err);
    });
  });