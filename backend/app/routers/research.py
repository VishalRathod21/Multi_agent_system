from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
import uuid
from datetime import datetime

router = APIRouter(prefix="/api/research", tags=["research"])

class ResearchCreate(BaseModel):
    topic: str
    mode: str  # "quick" or "deep"

class ResearchResponse(BaseModel):
    id: str
    topic: str
    mode: str
    status: str
    created_at: datetime
    updated_at: datetime
    result: Optional[dict] = None

# In-memory storage (replace with database in production)
research_sessions = []

@router.post("/", response_model=ResearchResponse)
async def create_research(research: ResearchCreate):
    """Create a new research session"""
    session = {
        "id": str(uuid.uuid4()),
        "topic": research.topic,
        "mode": research.mode,
        "status": "created",
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
        "result": None
    }
    research_sessions.append(session)
    return session

@router.get("/", response_model=List[ResearchResponse])
async def get_all_research():
    """Get all research sessions"""
    return research_sessions

@router.get("/{research_id}", response_model=ResearchResponse)
async def get_research(research_id: str):
    """Get a specific research session"""
    for session in research_sessions:
        if session["id"] == research_id:
            return session
    raise HTTPException(status_code=404, detail="Research session not found")

@router.put("/{research_id}/status")
async def update_research_status(research_id: str, status: str):
    """Update research session status"""
    for session in research_sessions:
        if session["id"] == research_id:
            session["status"] = status
            session["updated_at"] = datetime.now()
            return session
    raise HTTPException(status_code=404, detail="Research session not found")

@router.delete("/{research_id}")
async def delete_research(research_id: str):
    """Delete a research session"""
    for i, session in enumerate(research_sessions):
        if session["id"] == research_id:
            research_sessions.pop(i)
            return {"message": "Research session deleted"}
    raise HTTPException(status_code=404, detail="Research session not found")
