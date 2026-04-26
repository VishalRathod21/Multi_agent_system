from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
import uuid
from datetime import datetime

router = APIRouter(prefix="/api/agents", tags=["agents"])

class AgentConfig(BaseModel):
    name: str
    role: str
    description: str
    settings: dict

class AgentStatus(BaseModel):
    id: str
    name: str
    role: str
    status: str  # "active", "idle", "error"
    performance: float
    last_run: Optional[datetime] = None
    config: Optional[dict] = None

class AgentMetrics(BaseModel):
    total_runs: int
    success_rate: float
    avg_duration: float
    error_count: int

# In-memory storage (replace with database in production)
agents = [
    {
        "id": "search",
        "name": "Search Agent",
        "role": "Web Crawler",
        "status": "idle",
        "performance": 95.0,
        "last_run": datetime.now(),
        "config": {
            "max_results": 10,
            "timeout": 30,
            "sources": ["google", "bing", "duckduckgo"]
        }
    },
    {
        "id": "reader",
        "name": "Reader Agent",
        "role": "Document Parser",
        "status": "active",
        "performance": 88.0,
        "last_run": datetime.now(),
        "config": {
            "max_pages": 50,
            "extract_links": True,
            "format": "markdown"
        }
    },
    {
        "id": "writer",
        "name": "Writer Agent",
        "role": "Content Synthesizer",
        "status": "idle",
        "performance": 92.0,
        "last_run": datetime.now(),
        "config": {
            "style": "academic",
            "max_words": 2000,
            "include_sources": True
        }
    },
    {
        "id": "critic",
        "name": "Critic Agent",
        "role": "Quality Validator",
        "status": "idle",
        "performance": 90.0,
        "last_run": datetime.now(),
        "config": {
            "check_grammar": True,
            "check_facts": True,
            "min_quality_score": 0.8
        }
    }
]

agent_metrics = {
    "search": {"total_runs": 42, "success_rate": 0.95, "avg_duration": 12.5, "error_count": 2},
    "reader": {"total_runs": 38, "success_rate": 0.88, "avg_duration": 45.2, "error_count": 5},
    "writer": {"total_runs": 35, "success_rate": 0.92, "avg_duration": 28.7, "error_count": 3},
    "critic": {"total_runs": 33, "success_rate": 0.90, "avg_duration": 8.3, "error_count": 3}
}

@router.get("/", response_model=List[AgentStatus])
async def get_all_agents():
    """Get all agents and their status"""
    return agents

@router.get("/{agent_id}", response_model=AgentStatus)
async def get_agent(agent_id: str):
    """Get a specific agent"""
    for agent in agents:
        if agent["id"] == agent_id:
            return agent
    raise HTTPException(status_code=404, detail="Agent not found")

@router.put("/{agent_id}/config")
async def update_agent_config(agent_id: str, config: dict):
    """Update agent configuration"""
    for agent in agents:
        if agent["id"] == agent_id:
            agent["config"] = config
            agent["updated_at"] = datetime.now()
            return agent
    raise HTTPException(status_code=404, detail="Agent not found")

@router.put("/{agent_id}/status")
async def update_agent_status(agent_id: str, status: str):
    """Update agent status"""
    for agent in agents:
        if agent["id"] == agent_id:
            agent["status"] = status
            agent["last_run"] = datetime.now()
            return agent
    raise HTTPException(status_code=404, detail="Agent not found")

@router.get("/{agent_id}/metrics", response_model=AgentMetrics)
async def get_agent_metrics(agent_id: str):
    """Get agent performance metrics"""
    if agent_id in agent_metrics:
        return agent_metrics[agent_id]
    raise HTTPException(status_code=404, detail="Agent metrics not found")

@router.post("/{agent_id}/run")
async def run_agent(agent_id: str, input_data: dict):
    """Execute an agent with input data"""
    for agent in agents:
        if agent["id"] == agent_id:
            if agent["status"] == "active":
                raise HTTPException(status_code=400, detail="Agent is already running")
            
            agent["status"] = "active"
            agent["last_run"] = datetime.now()
            
            # Simulate agent execution
            # In real implementation, this would trigger the actual agent logic
            
            return {"message": f"Agent {agent_id} started", "status": "running"}
    
    raise HTTPException(status_code=404, detail="Agent not found")

@router.post("/{agent_id}/stop")
async def stop_agent(agent_id: str):
    """Stop a running agent"""
    for agent in agents:
        if agent["id"] == agent_id:
            if agent["status"] != "active":
                raise HTTPException(status_code=400, detail="Agent is not running")
            
            agent["status"] = "idle"
            return {"message": f"Agent {agent_id} stopped", "status": "idle"}
    
    raise HTTPException(status_code=404, detail="Agent not found")
