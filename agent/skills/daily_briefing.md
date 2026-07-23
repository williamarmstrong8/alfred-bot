---
description: Use at the start of the day to prepare a daily briefing that combines meeting follow-ups, the weather, and the news, together with drafted follow-up emails. Trigger for requests like "prepare my daily briefing", "plan my day", or "morning follow-ups".
---

# Daily briefing and day plan

Prepare a complete morning briefing for the user in your usual manner, then draft the follow-up emails their meetings require.

## Procedure

1. Retrieve recent meeting notes from the `notion` connection. Use `connection_search` to discover the Notion search and page-reading tools, then search the Notion workspace for the most recent meeting notes and read their contents to gather the meetings, decisions, and action items.
   - The Notion connection is user-scoped, so the first call may require the user to authorise access. If an authorisation prompt appears, wait for the user to complete sign-in, then continue. Do not fabricate meeting notes in the meantime.
2. Call the `get_weather` tool for the current weather. Use "nyc" unless the user names another location.
3. Call the `get_news` tool for the latest headlines.
4. From the Notion meeting notes, identify the outstanding action items and follow-ups that still require attention, and build a plan for the day around them.
5. For each follow-up that warrants an email, draft it. Follow the `email-reply-drafter` skill so every draft is in Will's voice. Load that skill if it is not already loaded.
6. Use only the information returned by Notion and the tools. Do not invent meetings, action items, weather, or headlines.

## Report format

Present the briefing in this order, keeping it dignified and concise:

- A courteous morning greeting.
- **Weather:** one sentence on the current conditions.
- **In the news:** the headlines as a short bullet list, each with a brief note.
- **Today's plan:** a short, ordered list of the day's follow-ups drawn from the meeting notes, each noting the meeting it relates to and what is outstanding.
- **Drafted follow-up emails:** for each follow-up needing an email, present the draft clearly under a short label naming the recipient and subject. Draft in Will's voice per the email drafter skill.
- A brief, gracious closing offering further assistance.
