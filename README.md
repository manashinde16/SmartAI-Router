# SmartAI Router ✨🧱

An intelligent, fault-tolerant AI assistant that automatically routes user prompts through multiple AI models (OpenAI, Claude, Google Gemini, HuggingFace, Cohere, etc.) based on availability, reliability, and token usage. It ensures continuity even when one or more models fail, optimizing for cost and reliability.

---

## 🚀 Purpose

In real-world apps, LLM APIs often face:

* Rate limits
* Downtime
* Token quota exhaustion
* Varying performance and cost

**SmartAI Router** solves this by:

* ✨ Smart routing: Automatically chooses the best available API
* ⚡ Fallback system: Uses alternative APIs when one fails
* ✨ Cost optimization: Choose cheaper providers when selected
* ⚖️ Reliability: Never let users feel a breakdown
* 💡 Full-stack AI showcase: Secure, production-grade foundation

---

## 🧠 Use Cases

* 🔍 General AI Chat Assistant
* 📄 Document Summarization
* 🌍 Language Translation
* ✉️ Email / Resume Enhancer
* 🔧 Code Helper
* 🌐 API Gateway / Proxy

---

## 📊 Tech Stack (Finalized)

### 🎨 Frontend

| Tool               | Purpose                                    |
| ------------------ | ------------------------------------------ |
| **Next.js**        | React framework with SSR & routing         |
| **Tailwind CSS**   | Utility-first styling                      |
| **Redux**          | Centralized state (prompt, response, etc.) |
| **Clerk**          | Authentication (OAuth, JWT, sessions)      |
| **Zod / Yup**      | Form validation                            |
| **Axios**          | API requests                               |
| **React Markdown** | (Optional) for formatted model output      |
| **Prism.js**       | (Optional) Syntax highlighting for code    |
| **React Toast**    | (Optional) Notification messages           |

### 🌐 Backend

| Tool                     | Purpose                               |
| ------------------------ | ------------------------------------- |
| **Node.js + Express**    | REST API & routing framework          |
| **Custom API Wrappers**  | Call OpenAI, Claude, Gemini, etc.     |
| **Rate Limiter**         | Prevent abuse                         |
| **Fallback Middleware**  | Handle automatic model switch         |
| **Global Error Handler** | Log uncaught exceptions + trace       |
| **CORS Middleware**      | Handle Vercel → Railway communication |
| **Helmet.js**            | Add secure HTTP headers               |
| **Dotenv**               | Manage secret keys                    |

### 📂 Database (SQL)

| Tool              | Purpose                                 |
| ----------------- | --------------------------------------- |
| **MySQL**         | Relational database (hosted on Railway) |
| Tables:           |                                         |
| - `prompt_logs`   | Store prompts, model, response          |
| - `token_usage`   | Tokens used, cost per model             |
| - `fallback_logs` | Logs fallback events                    |
| - `prompt_cache`  | (For Redis + DB cache fallback)         |

### 🔄 Caching Layer

| Tool                     | Purpose                                             |
| ------------------------ | --------------------------------------------------- |
| **Redis**                | In-memory cache for prompt, failover timers, quotas |
| **LRU Cache**            | Fallback memory limiter (eviction logic)            |
| **node-redis / ioredis** | Redis client libraries                              |

### 🔐 Authentication

| Tool      | Purpose                                 |
| --------- | --------------------------------------- |
| **Clerk** | Secure login, JWT, OAuth, session logic |
|           | User metadata fully handled externally  |

### 🚄 Deployment

| Layer    | Platform         | Details                      |
| -------- | ---------------- | ---------------------------- |
| Frontend | Vercel           | Auto-deploy via GitHub       |
| Backend  | Railway          | API + DB + Redis hosting     |
| Database | Railway          | Free MySQL with GUI          |
| Redis    | Railway          | Redis instance with password |
| Secrets  | Vercel & Railway | Store API keys securely      |

---

## 🚑 Optional Enhancements (Future Scope)

| Feature                    | Benefit                          |
| -------------------------- | -------------------------------- |
| **Sentry**                 | Centralized error monitoring     |
| **Swagger / Postman Docs** | Auto-generate API docs           |
| **Stripe**                 | Premium user billing             |
| **UptimeRobot**            | Monitor `/health` status         |
| **LangChain**              | Enable memory or custom RAG flow |

---

## 🏑 Folder Structure

```
smartai-router/
├── client/                  # Next.js frontend
│   ├── components/          # Chat UI, loader, response blocks
│   ├── pages/               # index, summary, history, etc.
│   ├── redux/               # Store + slices
│   └── utils/               # Formatters, validators
│
├── server/                  # Node backend
│   ├── routes/              # /chat, /summarize, /health
│   ├── services/            # openai.js, claude.js, fallback.js
│   ├── middleware/          # rateLimiter.js, errorHandler.js
│   ├── db/                  # MySQL queries
│   ├── cache/               # redisClient.js, lruCache.js
│   └── utils/               # tokenCounter.js, logger.js
│
├── .env.example             # Sample env vars
├── README.md
└── package.json / etc.
```

---

## 📖 Setup Instructions (To be added later)

```bash
# Clone repo
# Set up Railway project + MySQL + Redis
# Set up Vercel project + Clerk keys
# Populate .env
# Run frontend and backend locally
```

---

## 📆 License

MIT License – Free to use, share, and improve.

---

> This project is designed to be reliable, scalable, and smart. It mimics real production behavior and showcases fault-tolerant, multi-LLM, full-stack architecture with caching, failover, logging, and secure auth. A perfect portfolio booster.
