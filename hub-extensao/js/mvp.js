document.getElementById('btn-mvp').addEventListener('click', () => {
  const apkUrl = chrome.runtime.getURL("binarios/MVP.exe");

  chrome.downloads.download({
    url: apkUrl,
    filename: "MVP_Verificações.exe",
    saveAs: true
  });
});