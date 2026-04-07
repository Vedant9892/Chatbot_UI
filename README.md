# Groq Chatbot UI

Clean starter structure for a Groq-powered chatbot with:

- Frontend widget files in `public/`
- Express backend in `src/`
- Environment template in `.env.example`
- Local chatbot data storage in `data/`
- Log storage in `logs/`

## Folder Structure

```text
Chatbot_UI/
|-- .env.example
|-- .gitignore
|-- package.json
|-- README.md
|-- public/
|   |-- index.html
|   |-- styles.css
|   `-- app.js
|-- src/
|   |-- server.js
|   |-- config/
|   |   `-- env.js
|   |-- middleware/
|   |   `-- error-handler.js
|   |-- routes/
|   |   `-- chat.routes.js
|   |-- services/
|   |   |-- chat-storage.service.js
|   |   `-- groq.service.js
|   `-- utils/
|       `-- fileStore.js
|-- data/
|   |-- chats/
|   |   |-- .gitkeep
|   |   `-- messages.json
|   |-- sessions/
|   |   |-- .gitkeep
|   |   `-- sessions.json
|   |-- users/
|   |   |-- .gitkeep
|   |   `-- users.json
|   |-- knowledge/
|   |   |-- .gitkeep
|   |   `-- knowledge-base.json
|   `-- transcripts/
|       `-- transcripts.jsonl
`-- logs/
	`-- .gitkeep
```

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create your local env file:

```bash
copy .env.example .env
```

3. Add your Groq API key in `.env`:

```env
GROQ_API_KEY=your_real_key
```

4. Start the app:

```bash
npm run dev
```

5. Open:

```text
http://localhost:3000
```

## Notes

- Chat history is saved in `data/chats/messages.json`.
- Session/user metadata files are ready in `data/sessions/` and `data/users/`.
- Knowledge seeds can be stored in `data/knowledge/knowledge-base.json`.
