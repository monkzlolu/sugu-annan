// SUGU Annan - AI Chatbot

const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Manglish AI responses database
const aiResponses = {
    greetings: [
        "Namaskaram! Njan SUGU Annan. Enik ezhuthaan padunnu. 🙏",
        "Hey! Loading alla... Ithrayum kalayirunnu! 😄",
        "Shhh, loading alla... Annante ezhunnallippa! ⏳",
    ],
    help: [
        "Aah, neeyum sahayam venda ennu parayunathannu. Loading alla... Just a sec! 💪",
        "Saadhyamaayttu help kodu! Loading alla... Pokalaam! 🚀",
    ],
    greeting_back: [
        "Valare shukhathil! Namukku manoramam! 😊",
        "Thanxx bro! Loading alla... Santhoshichaanu! 🎉",
    ],
    how_are_you: [
        "Njan vadavellam shukhathil irkkuvan! Loading alla... Enik enthu ninte status? 😄",
        "Njan super! Annante ezhunnallippa loading alla! 🌟",
    ],
    jokes: [
        "Loading alla... Aah pulliye! Oru punchline paranjolum kitti aavum! 😂",
        "Loading alla... Athinu mathram smart aan ninte AI! 🤓",
    ],
    default: [
        "Shukriya ne oru nice question! Loading alla... Paranj tharam! 💭",
        "Loading alla... Annante ezhunnallippa! Enthelum choichaal sadhyamundakaam! 🤔",
        "Njan ith aleakil thada bhavichundum. Loading alla... Wait chey! ⏳",
    ],
};

// Function to get AI response based on user input
function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();

    if (
        message.includes('hello') ||
        message.includes('hi') ||
        message.includes('hey') ||
        message.includes('namaskaram')
    ) {
        return getRandomResponse(aiResponses.greetings);
    } else if (message.includes('help') || message.includes('how to')) {
        return getRandomResponse(aiResponses.help);
    } else if (
        message.includes('hi sugu') ||
        message.includes('hey sugu') ||
        message.includes('thanks')
    ) {
        return getRandomResponse(aiResponses.greeting_back);
    } else if (
        message.includes('how are you') ||
        message.includes('whats up') ||
        message.includes('enik ezhunnallippa')
    ) {
        return getRandomResponse(aiResponses.how_are_you);
    } else if (message.includes('joke') || message.includes('funny')) {
        return getRandomResponse(aiResponses.jokes);
    } else {
        return getRandomResponse(aiResponses.default);
    }
}

// Helper function to get random response
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Function to add message to chat
function addMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

    const messageContent = document.createElement('p');
    messageContent.textContent = message;

    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);

    // Auto-scroll to latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to show loading animation
function addLoadingMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message loading';

    const loadingContent = document.createElement('div');
    loadingContent.className = 'loading-dots';
    loadingContent.innerHTML = '<span></span><span></span><span></span>';

    messageDiv.appendChild(loadingContent);
    messageDiv.id = 'loadingMessage';
    chatMessages.appendChild(messageDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to remove loading animation
function removeLoadingMessage() {
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

// Send message function
function sendMessage() {
    const message = userInput.value.trim();

    if (message === '') return;

    // Add user message
    addMessage(message, true);
    userInput.value = '';

    // Show loading animation
    addLoadingMessage();

    // Simulate AI thinking time (1-2 seconds)
    const thinkingTime = Math.random() * 1000 + 800;

    setTimeout(() => {
        removeLoadingMessage();
        const response = getAIResponse(message);
        addMessage(response, false);
    }, thinkingTime);
}

// Send message on Enter key
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Focus on input field on load
userInput.focus();
