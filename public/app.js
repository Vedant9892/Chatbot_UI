const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.querySelector('.chat-messages');
const sendBtn = document.getElementById('sendBtn');
const chatToggle = document.getElementById('chatToggle');
const chatWidget = document.getElementById('chatWidget');

chatToggle.addEventListener('click', () => {
  chatToggle.classList.toggle('is-open');
  chatWidget.classList.toggle('is-open');
});

function addMessage(content, isUser = false) {
  const messageEl = document.createElement('div');
  messageEl.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

  const avatarSvg = `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
  </svg>`;

  messageEl.innerHTML = `
    <div class="message-avatar">${avatarSvg}</div>
    <div class="message-content">
      <p>${escapeHtml(content)}</p>
    </div>
  `;

  chatMessages.appendChild(messageEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}


const sessionId = `session-${Date.now()}`;

async function getBotResponse(userMessage) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: userMessage,
      sessionId
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch chatbot response.');
  }

  const data = await response.json();
  return data.reply || 'I could not generate a response this time.';
}


chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  addMessage(message, true);
  chatInput.value = '';
  sendBtn.disabled = true;

  try {
    const response = await getBotResponse(message);
    addMessage(response, false);
  } catch (error) {
    addMessage('Sorry, something went wrong while contacting the chatbot service.', false);
  } finally {
    sendBtn.disabled = false;
  }
});
