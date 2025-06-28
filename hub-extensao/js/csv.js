document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('entries');
    const addRowBtn = document.getElementById('addRow');
    const insertRowsBtn = document.getElementById('insertRows');
    const rowCountInput = document.getElementById('rowCount');
    const generateCsvBtn = document.getElementById('generateCsv');
    const closePopupBtn = document.getElementById('closePopup');

    // Máscaras de entrada
    function applyMasks(input, type) {
        input.addEventListener('input', function (e) {
            let value = e.target.value;
            if (type === 'data') {
                value = value.replace(/\D/g, '');
                if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
                if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5);
                if (value.length > 10) value = value.slice(0, 10);
            } else if (type === 'hora') {
                value = value.replace(/\D/g, '');
                if (value.length > 2) value = value.slice(0, 2) + ':' + value.slice(2);
                if (value.length > 5) value = value.slice(0, 5);
            } else if (type === 'cpf-instrutor') {
                value = value.replace(/\D/g, '');
                if (value.length > 3) value = value.slice(0, 3) + '.' + value.slice(3);
                if (value.length > 7) value = value.slice(0, 7) + '.' + value.slice(7);
                if (value.length > 11) value = value.slice(0, 11) + '-' + value.slice(11);
                if (value.length > 14) value = value.slice(0, 14);
            } else if (type === 'cpf-aluno') {
                value = value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);
            }
            e.target.value = value;
        });
    }

    // Aplica máscaras aos campos iniciais
    const firstEntry = document.querySelector('.csv-entry');
    applyMasks(firstEntry.querySelector('.csv-data'), 'data');
    applyMasks(firstEntry.querySelector('.csv-hora-inicio'), 'hora');
    applyMasks(firstEntry.querySelector('.csv-hora-fim'), 'hora');
    applyMasks(firstEntry.querySelector('.csv-cpf-instrutor'), 'cpf-instrutor');
    applyMasks(firstEntry.querySelector('.csv-cpf-aluno'), 'cpf-aluno');

    // Função para adicionar uma nova linha
    function addNewRow() {
        const firstSigla1 = document.querySelector('.csv-sigla1').value;
        const firstSigla2 = document.querySelector('.csv-sigla2').value;
        const firstCurso = document.querySelector('.csv-curso').value;
        const firstData = document.querySelector('.csv-data').value;
        const firstHoraInicio = document.querySelector('.csv-hora-inicio').value;
        const firstHoraFim = document.querySelector('.csv-hora-fim').value;
        const firstCpfInstrutor = document.querySelector('.csv-cpf-instrutor').value;

        const newEntry = document.createElement('div');
        newEntry.className = 'csv-entry';
        newEntry.innerHTML = `
            <input type="text" class="csv-sigla1" maxlength="1" value="${firstSigla1}" readonly>
            <input type="text" class="csv-sigla2" maxlength="1" value="${firstSigla2}" readonly>
            <span>;-;</span>
            <select class="csv-curso" disabled>
                <option value="Direção defensiva para veículos de duas ou mais rodas">Direção defensiva para veículos de duas ou mais rodas</option>
                <option value="Legislação de Trânsito">Legislação de Trânsito</option>
                <option value="Noções de Primeiros Socorros">Noções de Primeiros Socorros</option>
                <option value="Noções de Proteção e Respeito ao Meio Ambiente e de Convívio Social no Trânsito">Noções de Proteção e Respeito ao Meio Ambiente e de Convívio Social no Trânsito</option>
                <option value="Noções sobre Funcionamento do Veículo de duas ou mais rodas">Noções sobre Funcionamento do Veículo de duas ou mais rodas</option>
                <option value="Relacionamento Interpessoal">Relacionamento Interpessoal</option>
            </select>
            <input type="text" class="csv-data" value="${firstData}" readonly>
            <input type="text" class="csv-hora-inicio" value="${firstHoraInicio}" readonly>
            <input type="text" class="csv-hora-fim" value="${firstHoraFim}" readonly>
            <input type="text" class="csv-cpf-instrutor" value="${firstCpfInstrutor}" readonly>
            <input type="text" class="csv-cpf-aluno" placeholder="CPF Aluno" maxlength="11">
            <button class="csv-delete-btn">Apagar</button>
        `;
        container.appendChild(newEntry);

        newEntry.querySelector('.csv-curso').value = firstCurso;
        applyMasks(newEntry.querySelector('.csv-cpf-aluno'), 'cpf-aluno');

        newEntry.querySelector('.csv-delete-btn').addEventListener('click', function () {
            newEntry.remove();
        });
    }

    // Botão "+"
    addRowBtn.addEventListener('click', addNewRow);

    // Inserir várias linhas
    insertRowsBtn.addEventListener('click', function () {
        const rowCount = parseInt(rowCountInput.value) || 0;
        if (rowCount > 0) {
            for (let i = 0; i < rowCount; i++) {
                addNewRow();
            }
            rowCountInput.value = '';
        } else {
            alert('Por favor, insira um número válido de linhas.');
        }
    });

    // Gerar CSV
    generateCsvBtn.addEventListener('click', function () {
        const entries = document.querySelectorAll('.csv-entry');
        let csvContent = '';

        entries.forEach(entry => {
            const sigla1 = entry.querySelector('.csv-sigla1').value;
            const sigla2 = entry.querySelector('.csv-sigla2').value;
            const curso = entry.querySelector('.csv-curso').value;
            const data = entry.querySelector('.csv-data').value;
            const horaInicio = entry.querySelector('.csv-hora-inicio').value;
            const horaFim = entry.querySelector('.csv-hora-fim').value;
            const cpfInstrutor = entry.querySelector('.csv-cpf-instrutor').value;
            const cpfAlunoRaw = entry.querySelector('.csv-cpf-aluno').value;
            const cpfAlunoFormatted = cpfAlunoRaw.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

            const line = `${sigla1};${sigla2};-;${curso};${data};${horaInicio};${horaFim};${cpfInstrutor};${cpfAlunoRaw};${cpfAlunoFormatted}`;
            csvContent += line + '\n';
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'arquivo.csv';
        link.click();

        closePopupBtn.style.display = 'inline-block';
    });

    // Fechar
    closePopupBtn.addEventListener('click', function () {
        window.close();
    });
});
