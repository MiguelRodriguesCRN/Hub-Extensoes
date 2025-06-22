document.addEventListener('DOMContentLoaded', () => {
  const calculateButton = document.getElementById('calculateButton');
  if (calculateButton) {
    calculateButton.addEventListener('click', () => {
      const start = document.getElementById('startTime').value;
      const end = document.getElementById('endTime').value;

      if (!start || !end) {
        alert("Preencha os dois campos de hora!");
        return;
      }

      const [sh, sm] = start.split(':').map(Number);
      const [eh, em] = end.split(':').map(Number);

      let startSec = sh * 3600 + sm * 60;
      let endSec = eh * 3600 + em * 60;

      if (endSec < startSec) endSec += 86400;

      const duration = endSec - startSec;
      const h = Math.floor(duration / 3600);
      const m = Math.floor((duration % 3600) / 60);
      const totalMin = duration / 60;
      const aulas = Math.floor(totalMin / 50);

      document.getElementById('totalTime').innerHTML = `
        <p><strong>Início:</strong> ${start}</p>
        <p><strong>Fim:</strong> ${end}</p>
        <p><strong>Duração:</strong> ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}</p>
        <p><strong>Minutos:</strong> ${Math.round(totalMin)} min</p>
        <p><strong>Aulas:</strong> ${aulas} aula(s)</p>
      `;
    });
  }
});
