# Cortex — AI Research Centre

A multi-agent AI research system that deploys specialized AI agents to search, read, analyze, and synthesize comprehensive research reports on any topic.

## 🏗️ Architecture

Cortex uses a 4-step multi-agent pipeline:

```
User Input (Topic)
       |
       v
[Search Agent] → Web Search Results (Tavily API)
       |
       v
[Reader Agent] → Extracted Content (Web Scraping)
       |
       v
[Writer Agent] → Research Report (LLM Synthesis)
       |
       v
[Critic Agent] → Quality Review & Score (LLM Validation)
```

## ✨ Features

- **Multi-Agent Pipeline**: Four specialized AI agents working together
- **Real-time Search**: Powered by Tavily API for up-to-date web search
- **Web Scraping**: Extracts content from relevant URLs
- **AI Synthesis**: Generates comprehensive research reports
- **Quality Validation**: Critic agent reviews and scores the output
- **Beautiful UI**: Modern Next.js frontend with Tailwind CSS
- **Markdown Rendering**: Formatted output with proper typography
- **Agent Dashboard**: View agent status and performance metrics
- **Research History**: Track past research sessions
- **Report Management**: View and manage generated reports

## 📋 Prerequisites

- Python 3.10+
- Node.js 18+
- Tavily API Key (free at https://tavily.com)
- Groq API Key (free at https://console.groq.com/keys)

## 🗂️ Project Structure

```
Multi-agent_system/
├── backend_main.py       # FastAPI server
├── pipeline.py           # Pipeline orchestration
├── agents.py             # LangChain agents
├── tools.py              # Tavily search + scraping tools
├── requirements.txt      # Python dependencies
├── .env                  # API keys (not in git)
├── .env.example          # Environment template
├── .gitignore            # Git ignore rules
├── frontend/             # Next.js React UI
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── layout.tsx         # Root layout
│   │   │   ├── globals.css        # Global styles
│   │   │   ├── agents/            # Agents page
│   │   │   ├── research/          # Research dashboard
│   │   │   ├── history/           # History page
│   │   │   └── reports/           # Reports page
│   │   └── components/
│   │       ├── layout/
│   │       │   ├── MainLayout.tsx # Main layout wrapper
│   │       │   ├── Navbar.tsx     # Navigation bar
│   │       │   └── Sidebar.tsx    # Agent sidebar
│   │       ├── ResultCard.tsx     # Result card component
│   │       ├── FormattedContent.tsx # Markdown renderer
│   │       └── ui/                # UI components
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── postcss.config.mjs
└── README.md
```

## 🚀 Setup

### 1. Clone the Repository

```bash
git clone https://github.com/VishalRathod21/Multi_agent_system.git
cd Multi-agent_system
```

### 2. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 4. Configure Environment Variables

Copy the example environment file and add your API keys:

```bash
cp .env.example .env
```

Edit `.env` with your actual API keys:

```bash
TAVILY_API_KEY=your_tavily_api_key_here
GROQ_API_KEY=your_groq_api_key_here
OPENAI_API_KEY=your_openai_api_key_here  # Optional
```

### 5. Run the Backend

```bash
python backend_main.py
```

Backend runs at: http://localhost:8001

**API Endpoints:**
- `GET /health` - Health check
- `POST /run` - Run research pipeline (body: `{"topic": "your topic"}`)
- `GET /api/research` - Get research sessions
- `GET /api/agents` - Get agent status
- `GET /api/history` - Get research history
- `GET /api/reports` - Get reports

### 6. Run the Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

Frontend runs at: http://localhost:3000

## 📖 Usage

1. Open http://localhost:3000 in your browser
2. Enter a research topic (e.g., "quantum computing breakthroughs 2025")
3. Click "Research →" or select a suggested topic
4. Choose between Quick or Deep Research mode
5. View the results with formatted markdown output:
   - 🔍 Search Agent results
   - 📖 Reader Agent analysis
   - ✍️ Writer Agent synthesis
   - 🎯 Critic Agent review

## 🛠️ Tech Stack

**Backend:**
- FastAPI - REST API server
- LangChain - Agent orchestration
- Groq (Llama models) - LLM inference
- Tavily - Web search API
- BeautifulSoup - Web scraping
- Uvicorn - ASGI server

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion - Animations
- React Markdown - Markdown rendering
- Lucide Icons - Icon library

## 🔧 Configuration

### Backend Port

To change the backend port, edit `backend_main.py`:

```python
uvicorn.run(app, host="0.0.0.0", port=8001)  # Change 8001 to your desired port
```

### Frontend API URL

Update the API URL in `frontend/src/app/page.tsx`:

```typescript
const response = await fetch("http://localhost:8001/run", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ topic: query }),
});
```

### Groq Models

Edit `agents.py` to change the LLM model:
- `llama-3.3-70b-versatile` - Higher rate limits
- `openai/gpt-oss-120b` - Latest model
- `llama-3.1-8b-instant` - Fastest, lowest limits

## 🐛 Troubleshooting

**Port Already in Use:**
```bash
# Kill process on port 8001
lsof -ti:8001 | xargs kill -9
```

**API Key Errors:**
- Verify keys in `.env`
- Restart backend after changing `.env`

**CORS Errors:**
- Ensure backend allows origins: `allow_origins=["*"]`

**Frontend Build Errors:**
```bash
cd frontend
rm -rf .next node_modules
npm install
npm run dev
```

**PyTorch Warning:**
- Informational only, models not required for basic functionality

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using Cortex AI Research Centre**
