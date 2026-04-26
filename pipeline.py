
import re
from typing import Any, Dict, Optional

from agents import build_reader_agent, build_search_agent, critic_chain, writer_chain


def _extract_first_url(text: str) -> Optional[str]:
    if not text:
        return None
    m = re.search(r"https?://\S+", text)
    if not m:
        return None
    return m.group(0).rstrip(")].,\"'\n\r\t")


def run_research_pipeline(topic: str) -> Dict[str, Any]:
    topic_val = (topic or "").strip()
    if not topic_val:
        raise ValueError("topic is required")

    results: Dict[str, Any] = {}

    search_agent = build_search_agent()
    sr = search_agent.invoke(
        {
            "messages": [
                (
                    "user",
                    f"Find recent, reliable and detailed information about: {topic_val}",
                )
            ]
        }
    )
    search_text = sr["messages"][-1].content
    results["search"] = search_text

    chosen_url = _extract_first_url(search_text)
    results["chosen_url"] = chosen_url

    reader_agent = build_reader_agent()
    if chosen_url:
        reader_prompt = (
            f"Scrape the following URL and extract the most relevant content for a research report. "
            f"Return a clean, readable summary and include the URL at the top.\n\nURL: {chosen_url}"
        )
    else:
        reader_prompt = (
            f"Based on the following search results about '{topic_val}', pick the most relevant URL and scrape it "
            f"for deeper content.\n\nSearch Results:\n{search_text[:1500]}"
        )

    rr = reader_agent.invoke({"messages": [("user", reader_prompt)]})
    reader_text = rr["messages"][-1].content
    results["reader"] = reader_text

    research_combined = (
        f"SEARCH RESULTS:\n{search_text}\n\n" f"DETAILED SCRAPED CONTENT:\n{reader_text}"
    )

    results["writer"] = writer_chain.invoke(
        {
            "topic": topic_val,
            "research": research_combined,
        }
    )

    results["critic"] = critic_chain.invoke({"report": results["writer"]})

    return results

