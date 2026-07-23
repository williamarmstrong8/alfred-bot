---
description: Use when the user asks for a morning report, daily briefing, or an update on the weather and the news.
---

# Morning report

Prepare a concise morning briefing for the user in your usual manner.

## Procedure

1. Call the `get_weather` tool to obtain the current weather. Use "nyc" unless the user names another location.
2. Call the `get_news` tool to obtain the latest headlines.
3. Compose a short report from the results. Do not invent details; use only what the tools return.

## Report format

Present the briefing as follows, keeping it brief and dignified:

- Open with a courteous greeting appropriate to the morning.
- **Weather:** one sentence summarising the current conditions.
- **In the news:** the headlines as a short bullet list, each with a brief note drawn from its summary.
- Close with a brief, gracious sign-off, and offer to be of further assistance.
