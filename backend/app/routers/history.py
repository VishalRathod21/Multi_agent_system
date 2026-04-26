from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
import uuid
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/history", tags=["history"])

class HistoryItem(BaseModel):
    id: str
    topic: str
    date: datetime
    status: str  # "completed", "failed", "running"
    duration: str
    agents: List[str]
    result: Optional[dict] = None
    error: Optional[str] = None

class HistoryStats(BaseModel):
    total_sessions: int
    success_rate: float
    avg_duration: float
    most_used_agent: str
    popular_topics: List[str]

# In-memory storage (replace with database in production)
history_items = [
    {
        "id": "1",
        "topic": "AI Agents Architecture",
        "date": datetime.now() - timedelta(hours=2),
        "status": "completed",
        "duration": "3m 24s",
        "agents": ["search", "reader", "writer", "critic"],
        "result": {"word_count": 2456, "quality_score": 4.8}
    },
    {
        "id": "2",
        "topic": "Market Trends Q1 2024",
        "date": datetime.now() - timedelta(hours=4),
        "status": "completed",
        "duration": "2m 45s",
        "agents": ["search", "reader", "writer", "critic"],
        "result": {"word_count": 1823, "quality_score": 4.5}
    },
    {
        "id": "3",
        "topic": "Climate Technology Solutions",
        "date": datetime.now() - timedelta(hours=6),
        "status": "failed",
        "duration": "1m 12s",
        "agents": ["search", "reader"],
        "error": "Connection timeout during web scraping"
    },
    {
        "id": "4",
        "topic": "Quantum Computing Advances",
        "date": datetime.now() - timedelta(days=1),
        "status": "completed",
        "duration": "4m 30s",
        "agents": ["search", "reader", "writer", "critic"],
        "result": {"word_count": 2891, "quality_score": 4.9}
    },
    {
        "id": "5",
        "topic": "Startup Funding Analysis",
        "date": datetime.now() - timedelta(days=1, hours=2),
        "status": "running",
        "duration": "1m 05s",
        "agents": ["search", "reader", "writer"]
    }
]

@router.get("/", response_model=List[HistoryItem])
async def get_history(limit: int = 50, status: Optional[str] = None):
    """Get research history with optional filtering"""
    filtered_items = history_items
    
    if status:
        filtered_items = [item for item in filtered_items if item["status"] == status]
    
    # Sort by date (newest first) and limit
    filtered_items.sort(key=lambda x: x["date"], reverse=True)
    return filtered_items[:limit]

@router.get("/{history_id}", response_model=HistoryItem)
async def get_history_item(history_id: str):
    """Get a specific history item"""
    for item in history_items:
        if item["id"] == history_id:
            return item
    raise HTTPException(status_code=404, detail="History item not found")

@router.get("/stats/summary", response_model=HistoryStats)
async def get_history_stats():
    """Get history statistics"""
    total_sessions = len(history_items)
    completed_sessions = [item for item in history_items if item["status"] == "completed"]
    success_rate = len(completed_sessions) / total_sessions if total_sessions > 0 else 0
    
    # Calculate average duration (convert "3m 24s" to seconds)
    durations = []
    for item in history_items:
        if item["status"] == "completed":
            parts = item["duration"].replace("m ", ":").replace("s", "").split(":")
            if len(parts) == 2:
                minutes, seconds = int(parts[0]), int(parts[1])
                durations.append(minutes * 60 + seconds)
    
    avg_duration_seconds = sum(durations) / len(durations) if durations else 0
    avg_minutes = int(avg_duration_seconds // 60)
    avg_seconds = int(avg_duration_seconds % 60)
    avg_duration = f"{avg_minutes}m {avg_seconds}s"
    
    # Find most used agent
    agent_counts = {}
    for item in history_items:
        for agent in item["agents"]:
            agent_counts[agent] = agent_counts.get(agent, 0) + 1
    
    most_used_agent = max(agent_counts.items(), key=lambda x: x[1])[0] if agent_counts else "none"
    
    # Find popular topics
    topic_counts = {}
    for item in history_items:
        topic_counts[item["topic"]] = topic_counts.get(item["topic"], 0) + 1
    
    popular_topics = sorted(topic_counts.items(), key=lambda x: x[1], reverse=True)[:3]
    popular_topics = [topic for topic, _ in popular_topics]
    
    return HistoryStats(
        total_sessions=total_sessions,
        success_rate=success_rate,
        avg_duration=avg_duration,
        most_used_agent=most_used_agent,
        popular_topics=popular_topics
    )

@router.delete("/{history_id}")
async def delete_history_item(history_id: str):
    """Delete a history item"""
    for i, item in enumerate(history_items):
        if item["id"] == history_id:
            history_items.pop(i)
            return {"message": "History item deleted"}
    raise HTTPException(status_code=404, detail="History item not found")

@router.delete("/")
async def clear_history():
    """Clear all history"""
    history_items.clear()
    return {"message": "All history cleared"}

@router.get("/export/csv")
async def export_history_csv():
    """Export history as CSV"""
    # In a real implementation, this would generate and return a CSV file
    return {"message": "CSV export not implemented yet", "data": history_items}

@router.post("/{history_id}/retry")
async def retry_research(history_id: str):
    """Retry a failed research session"""
    for item in history_items:
        if item["id"] == history_id:
            if item["status"] != "failed":
                raise HTTPException(status_code=400, detail="Can only retry failed sessions")
            
            # Create a new research session based on the failed one
            new_id = str(uuid.uuid4())
            new_item = {
                "id": new_id,
                "topic": item["topic"],
                "date": datetime.now(),
                "status": "running",
                "duration": "0s",
                "agents": item["agents"],
                "result": None,
                "error": None
            }
            history_items.append(new_item)
            
            return {"message": "Research retry initiated", "new_id": new_id}
    
    raise HTTPException(status_code=404, detail="History item not found")
