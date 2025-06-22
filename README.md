# 🧩 HUB de Extensões

Este projeto é uma extensão de navegador que centraliza ferramentas úteis em um único local, incluindo um **gravador de áudio**, **atalhos de texto com cópia rápida**, uma **calculadora de tempo de aula**, além de um **acesso externo a ferramentas de coletores**.

## 🔧 Funcionalidades

### 🎙️ Gravador de Áudio
- Inicie, pare e reproduza gravações de áudio diretamente no navegador.
- Gere um link para compartilhar a gravação.
- Copie o link gerado para a área de transferência.

### ⌨️ Atalhos de Texto
- Seções organizadas por categorias (Ex: Super Prático, Teórico Presencial, etc).
- Expanda e recolha listas de atalhos clicando em seus títulos.
- Copie rapidamente qualquer atalho com um clique.

### ⏱️ Calculadora de Horas de Aula
- Informe o horário de início e término de uma aula.
- Veja a duração formatada em horas e minutos.
- Calcule automaticamente o número de aulas (base 50 minutos por aula).

### 🌐 Link Externo - Coletores
- Acesse o sistema externo dos Coletores com um clique

## 📁 Estrutura de Arquivos

```plaintext
├── popup.html               # Interface principal da extensão
├── style.css                # Estilização central (com responsividade e foco nas 3 seções)
├── js/
│   ├── audio-recorder.js    # Classe e lógica do gravador de áudio
│   ├── extensao2.js         # Lógica dos atalhos e calculadora
├── assets/                  # (opcional) Ícones ou recursos visuais
└── README.md                # Este arquivo
