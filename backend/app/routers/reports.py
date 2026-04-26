from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
import uuid
from datetime import datetime

router = APIRouter(prefix="/api/reports", tags=["reports"])

class ReportCreate(BaseModel):
    title: str
    topic: str
    content: str
    status: str  # "draft", "published", "archived"

class ReportUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    status: Optional[str] = None

class ReportResponse(BaseModel):
    id: str
    title: str
    topic: str
    content: str
    status: str
    created_at: datetime
    updated_at: datetime
    word_count: int
    rating: float

class ReportStats(BaseModel):
    total_reports: int
    published_reports: int
    draft_reports: int
    archived_reports: int
    avg_rating: float
    total_words: int

# In-memory storage (replace with database in production)
reports = [
    {
        "id": "1",
        "title": "AI Agents Architecture Analysis",
        "topic": "AI Agents",
        "content": "Comprehensive analysis of AI agent architectures...",
        "status": "published",
        "created_at": datetime.now() - timedelta(hours=2),
        "updated_at": datetime.now() - timedelta(hours=2),
        "word_count": 2456,
        "rating": 4.8
    },
    {
        "id": "2",
        "title": "Market Trends Q1 2024 Report",
        "topic": "Market Trends",
        "content": "Detailed market analysis for Q1 2024...",
        "status": "published",
        "created_at": datetime.now() - timedelta(hours=4),
        "updated_at": datetime.now() - timedelta(hours=4),
        "word_count": 1823,
        "rating": 4.5
    },
    {
        "id": "3",
        "title": "Climate Technology Solutions Overview",
        "topic": "Climate Tech",
        "content": "Overview of emerging climate technologies...",
        "status": "draft",
        "created_at": datetime.now() - timedelta(hours=6),
        "updated_at": datetime.now() - timedelta(hours=6),
        "word_count": 3124,
        "rating": 0.0
    },
    {
        "id": "4",
        "title": "Quantum Computing Advances 2024",
        "topic": "Quantum Computing",
        "content": "Latest advances in quantum computing...",
        "status": "published",
        "created_at": datetime.now() - timedelta(days=1),
        "updated_at": datetime.now() - timedelta(days=1),
        "word_count": 2891,
        "rating": 4.9
    },
    {
        "id": "5",
        "title": "Startup Funding Analysis Report",
        "topic": "Startup Ideas",
        "content": "Analysis of startup funding patterns...",
        "status": "archived",
        "created_at": datetime.now() - timedelta(days=1, hours=2),
        "updated_at": datetime.now() - timedelta(days=1, hours=2),
        "word_count": 1567,
        "rating": 4.2
    }
]

@router.post("/", response_model=ReportResponse)
async def create_report(report: ReportCreate):
    """Create a new report"""
    new_report = {
        "id": str(uuid.uuid4()),
        "title": report.title,
        "topic": report.topic,
        "content": report.content,
        "status": report.status,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
        "word_count": len(report.content.split()),
        "rating": 0.0
    }
    reports.append(new_report)
    return new_report

@router.get("/", response_model=List[ReportResponse])
async def get_all_reports(status: Optional[str] = None, topic: Optional[str] = None, limit: int = 50):
    """Get all reports with optional filtering"""
    filtered_reports = reports
    
    if status:
        filtered_reports = [r for r in filtered_reports if r["status"] == status]
    
    if topic:
        filtered_reports = [r for r in filtered_reports if r["topic"].lower() == topic.lower()]
    
    # Sort by updated date (newest first) and limit
    filtered_reports.sort(key=lambda x: x["updated_at"], reverse=True)
    return filtered_reports[:limit]

@router.get("/{report_id}", response_model=ReportResponse)
async def get_report(report_id: str):
    """Get a specific report"""
    for report in reports:
        if report["id"] == report_id:
            return report
    raise HTTPException(status_code=404, detail="Report not found")

@router.put("/{report_id}", response_model=ReportResponse)
async def update_report(report_id: str, update: ReportUpdate):
    """Update a report"""
    for report in reports:
        if report["id"] == report_id:
            if update.title is not None:
                report["title"] = update.title
            if update.content is not None:
                report["content"] = update.content
                report["word_count"] = len(update.content.split())
            if update.status is not None:
                report["status"] = update.status
            
            report["updated_at"] = datetime.now()
            return report
    
    raise HTTPException(status_code=404, detail="Report not found")

@router.delete("/{report_id}")
async def delete_report(report_id: str):
    """Delete a report"""
    for i, report in enumerate(reports):
        if report["id"] == report_id:
            reports.pop(i)
            return {"message": "Report deleted"}
    
    raise HTTPException(status_code=404, detail="Report not found")

@router.post("/{report_id}/rate")
async def rate_report(report_id: str, rating: float):
    """Rate a report (1-5 stars)"""
    if not 1 <= rating <= 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")
    
    for report in reports:
        if report["id"] == report_id:
            # In a real implementation, this would store individual ratings and calculate average
            report["rating"] = rating
            report["updated_at"] = datetime.now()
            return {"message": "Report rated", "rating": rating}
    
    raise HTTPException(status_code=404, detail="Report not found")

@router.get("/stats/summary", response_model=ReportStats)
async def get_report_stats():
    """Get report statistics"""
    total_reports = len(reports)
    published_reports = len([r for r in reports if r["status"] == "published"])
    draft_reports = len([r for r in reports if r["status"] == "draft"])
    archived_reports = len([r for r in reports if r["status"] == "archived"])
    
    rated_reports = [r for r in reports if r["rating"] > 0]
    avg_rating = sum(r["rating"] for r in rated_reports) / len(rated_reports) if rated_reports else 0
    
    total_words = sum(r["word_count"] for r in reports)
    
    return ReportStats(
        total_reports=total_reports,
        published_reports=published_reports,
        draft_reports=draft_reports,
        archived_reports=archived_reports,
        avg_rating=avg_rating,
        total_words=total_words
    )

@router.get("/{report_id}/download")
async def download_report(report_id: str, format: str = "markdown"):
    """Download a report in specified format"""
    for report in reports:
        if report["id"] == report_id:
            if format.lower() == "markdown":
                return {
                    "content": report["content"],
                    "filename": f"{report['title'].replace(' ', '_')}.md",
                    "content_type": "text/markdown"
                }
            elif format.lower() == "pdf":
                # In a real implementation, this would convert to PDF
                return {
                    "message": "PDF export not implemented yet",
                    "content": report["content"]
                }
            else:
                raise HTTPException(status_code=400, detail="Unsupported format")
    
    raise HTTPException(status_code=404, detail="Report not found")

@router.post("/{report_id}/publish")
async def publish_report(report_id: str):
    """Publish a draft report"""
    for report in reports:
        if report["id"] == report_id:
            if report["status"] != "draft":
                raise HTTPException(status_code=400, detail="Only draft reports can be published")
            
            report["status"] = "published"
            report["updated_at"] = datetime.now()
            return {"message": "Report published", "status": "published"}
    
    raise HTTPException(status_code=404, detail="Report not found")

@router.post("/{report_id}/archive")
async def archive_report(report_id: str):
    """Archive a report"""
    for report in reports:
        if report["id"] == report_id:
            if report["status"] == "archived":
                raise HTTPException(status_code=400, detail="Report is already archived")
            
            report["status"] = "archived"
            report["updated_at"] = datetime.now()
            return {"message": "Report archived", "status": "archived"}
    
    raise HTTPException(status_code=404, detail="Report not found")
