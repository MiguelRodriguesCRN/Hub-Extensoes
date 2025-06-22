class AudioRecorder {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.audioBlob = null;
    this.audioUrl = null;
    this.audio = new Audio();
    this.stream = null;
    this.latestDownloadUrl = ""; // ⬅️ Link salvo aqui
  }

  async startRecording() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.audioChunks = [];

      this.mediaRecorder.addEventListener("dataavailable", event => {
        this.audioChunks.push(event.data);
      });

      this.mediaRecorder.addEventListener("stop", () => {
        this.audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
        this.audioUrl = URL.createObjectURL(this.audioBlob);
        this.audio.src = this.audioUrl;
        this.uploadRecording(); // Upload automático
      });

      this.mediaRecorder.start();
      return true;
    } catch (error) {
      console.error("Erro ao iniciar gravação:", error);
      return false;
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
      this.stream.getTracks().forEach(track => track.stop());
      return true;
    }
    return false;
  }

  playRecording() {
    if (this.audioUrl) {
      this.audio.play();
      return true;
    }
    return false;
  }

  getAudioBlob() {
    return this.audioBlob;
  }

  async uploadRecording() {
    const statusDiv = document.getElementById('status');
    const resultDiv = document.getElementById('result');
    const expiryInfo = document.getElementById('expiryInfo');

    statusDiv.textContent = "Enviando para tmpfiles.org...";

    try {
      const formData = new FormData();
      formData.append('file', this.getAudioBlob(), 'gravacao.wav');

      const response = await fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.status && data.data) {
        const downloadUrl = data.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
        this.latestDownloadUrl = downloadUrl; // ⬅️ Salva o link
        resultDiv.classList.remove('hidden');
        statusDiv.textContent = "Upload concluído!";
        expiryInfo.textContent = "O arquivo ficará disponível por 7 dias.";
      } else {
        throw new Error(data.message || 'Falha no upload');
      }
    } catch (err) {
      statusDiv.textContent = "Erro no upload: " + err.message;
    }
  }
}

function showExtension(id) {
  const sections = document.querySelectorAll(".ext-content");
  sections.forEach(section => section.style.display = "none");

  const target = document.getElementById(id);
  if (target) {
    target.style.display = "block";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Botões de navegação
  const btnAudio = document.getElementById("btn-audio");
  const btnTools = document.getElementById("btn-tools");
  if (btnAudio && btnTools) {
    btnAudio.addEventListener("click", () => showExtension("ext1"));
    btnTools.addEventListener("click", () => showExtension("ext2"));
  }

  const recordButton = document.getElementById('recordButton');
  const stopButton = document.getElementById('stopButton');
  const playButton = document.getElementById('playButton');
  const copyButton = document.getElementById('copyButton');
  const statusDiv = document.getElementById('status');

  const audioRecorder = new AudioRecorder();

  recordButton.addEventListener('click', async () => {
    if (await audioRecorder.startRecording()) {
      statusDiv.textContent = "Gravando...";
      recordButton.disabled = true;
      stopButton.disabled = false;
      playButton.disabled = true;
    }
  });

  stopButton.addEventListener('click', () => {
    if (audioRecorder.stopRecording()) {
      statusDiv.textContent = "Gravação concluída. Enviando...";
      recordButton.disabled = false;
      stopButton.disabled = true;
      playButton.disabled = false;
    }
  });

  playButton.addEventListener('click', () => {
    if (audioRecorder.playRecording()) {
      statusDiv.textContent = "Reproduzindo gravação...";
      audioRecorder.audio.addEventListener('ended', () => {
        statusDiv.textContent = "Gravação concluída";
      });
    }
  });

  copyButton.addEventListener('click', () => {
    const link = audioRecorder.latestDownloadUrl;
    if (!link) {
      statusDiv.textContent = "Nenhum link gerado ainda.";
      return;
    }
    navigator.clipboard.writeText(link).then(() => {
      copyButton.textContent = "Copiado!";
      setTimeout(() => copyButton.textContent = "Copiar Link", 2000);
    });
  });
});
