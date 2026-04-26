from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

try:
    from pipeline import run_research_pipeline
except ImportError:
    def run_research_pipeline(topic):
        return {"writer": "Sample research content", "critic": "Good quality"}

# Import new routers (these would need to be created in the backend directory)
# from app.routers import research, agents, history, reports


app = FastAPI(title="Cortex API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class RunRequest(BaseModel):
    topic: str = Field(..., min_length=1)


class RunResponse(BaseModel):
    topic: str
    chosen_url: str | None = None
    search: str
    reader: str
    writer: str
    critic: str


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/run", response_model=RunResponse)
def run(req: RunRequest):
    try:
        results = run_research_pipeline(req.topic)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {
        "topic": req.topic,
        "chosen_url": results.get("chosen_url"),
        "search": results.get("search", ""),
        "reader": results.get("reader", ""),
        "writer": results.get("writer", ""),
        "critic": results.get("critic", ""),
    }


# New API endpoints for Research, Agents, History, and Reports
# These are simplified versions - in production they would use the router files

@app.get("/api/research")
def get_research_sessions():
    return {
        "sessions": [
            {
                "id": "1",
                "topic": "AI Agents Architecture",
                "status": "completed",
                "created_at": "2024-04-24T14:30:00Z"
            }
        ]
    }

@app.get("/api/agents")
def get_agents():
    return {
        "agents": [
            {
                "id": "search",
                "name": "Search Agent",
                "role": "Web Crawler",
                "status": "idle",
                "performance": 95.0
            },
            {
                "id": "reader",
                "name": "Reader Agent",
                "role": "Document Parser",
                "status": "active",
                "performance": 88.0
            },
            {
                "id": "writer",
                "name": "Writer Agent",
                "role": "Content Synthesizer",
                "status": "idle",
                "performance": 92.0
            },
            {
                "id": "critic",
                "name": "Critic Agent",
                "role": "Quality Validator",
                "status": "idle",
                "performance": 90.0
            }
        ]
    }

@app.get("/api/history")
def get_history():
    return {
        "history": [
            {
                "id": "1",
                "topic": "AI Agents Architecture",
                "date": "2024-04-24T14:30:00Z",
                "status": "completed",
                "duration": "3m 24s",
                "agents": ["search", "reader", "writer", "critic"]
            },
            {
                "id": "2",
                "topic": "Market Trends Q1 2024",
                "date": "2024-04-24T12:15:00Z",
                "status": "completed",
                "duration": "2m 45s",
                "agents": ["search", "reader", "writer", "critic"]
            }
        ]
    }

@app.get("/api/reports")
def get_reports():
    return {
        "reports": [
            {
                "id": "1",
                "title": "AI Agents Architecture Analysis",
                "topic": "AI Agents",
                "status": "published",
                "word_count": 2456,
                "rating": 4.8,
                "date": "2024-04-24T14:30:00Z"
            },
            {
                "id": "2",
                "title": "Market Trends Q1 2024 Report",
                "topic": "Market Trends",
                "status": "published",
                "word_count": 1823,
                "rating": 4.5,
                "date": "2024-04-24T12:15:00Z"
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
