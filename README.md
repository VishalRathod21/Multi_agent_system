# ResearchMind (Multi-agent Research System)

An AI-powered research assistant with a 4-step multi-agent pipeline: **Search, Reader, Writer, Critic**

## Architecture

```
User Input (Topic)
       |
       v
[Search Agent] --(Tavily API)--> Web Search Results
       |
       v
[Reader Agent] --(Scraping)--> Extracted Content
       |
       v
[Writer Chain] --(Groq LLM)--> Research Report
       |
       v
[Critic Chain] --(Groq LLM)--> Review & Score
```

## Prerequisites

- Python 3.10+
- Node.js 18+
- Groq API Key (free at https://console.groq.com/keys)
- Tavily API Key (free at https://tavily.com)

## Project Structure

```
Multi-agent_system/
,-- agents.py          # LangChain agents (Search, Reader, Writer, Critic)
|-- tools.py           # Tavily search + URL scraping tools
|-- pipeline.py        # Pipeline orchestration
|-- backend_main.py    # FastAPI server
|-- requirements.txt   # Python dependencies
|-- .env               # API keys
|-- frontend/          # Next.js React UI
|   |-- src/
|   |   |-- app/
|   |   |   |-- page.tsx      # Main page
|   |   |   |-- globals.css   # Styling
|   |   |-- components/
|   |       |-- Sidebar.tsx   # Agent list panel
|   |       |-- Workspace.tsx # Main workspace
|   |       |-- Pipeline.tsx # Pipeline visualization
|   |-- package.json
```

## Setup

### 1. Clone and Install Dependencies

```bash
# Python dependencies
pip install -r requirements.txt

# Node.js dependencies
cd frontend
npm install
```

### 2. Configure Environment Variables

Create `.env` in the project root:

```bash
TAVILY_API_KEY="your-tavily-api-key"
GROQ_API_KEY="your-groq-api-key"
```

### 3. Run the Backend

```bash
# From project root
uvicorn backend_main:app --reload --port 8002
```

Backend runs at: http://127.0.0.1:8002

API Endpoints:
- `GET /health` - Health check
- `POST /run` - Run research pipeline (body: `{"topic": "your topic"}`)

### 4. Run the Frontend

```bash
# In a new terminal
cd frontend
npm run dev
```

Frontend runs at: http://localhost:3000

## Usage

1. Open http://localhost:3000 in your browser
2. Enter a research topic (e.g., "quantum computing breakthroughs 2025")
3. Click "Run Research" or choose Quick/Deep mode
4. Watch the pipeline progress in the right panel
5. View the generated report and critic feedback

## Tech Stack

**Backend:**
- FastAPI - REST API server
- LangChain - Agent orchestration
- Groq (Llama models) - LLM inference
- Tavily - Web search API
- BeautifulSoup - Web scraping

**Frontend:**
- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- Framer Motion - Animations
- Lucide Icons

## Available Groq Models

Edit `agents.py` to change the model:
- `llama-3.3-70b-versatile` - Higher rate limits
- `openai/gpt-oss-120b` - Latest model
- `llama-3.1-8b-instant` - Fastest, lowest limits

## Troubleshooting

**Rate Limit Error:**
- Wait 30-60 seconds between requests
- Switch to a model with higher TPM limits

**API Key Error:**
- Verify keys in `.env`
- Restart backend after changing `.env`

**CORS Error:**
- Backend must run on port 8002
- Frontend expects http://127.0.0.1:8002
