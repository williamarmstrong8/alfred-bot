# alfred-bot

Alfred is a personal assistant built on the [eve](https://www.npmjs.com/package/eve) framework, styled after a devoted English butler: formal, discreet, and written in British English. He delivers morning briefings, keeps across meeting follow-ups, and drafts email replies in the owner's voice.

## What Alfred can do

- **Morning report** — a concise weather and news briefing.
- **Daily briefing and day plan** — pulls recent meeting notes from Notion, combines them with the weather and news, builds a plan of follow-ups, and drafts the follow-up emails.
- **Email drafting** — writes replies in Will Armstrong's personal voice from a detailed style profile.
- **Scheduled delivery** — posts the morning report to Slack automatically each day.

## Project layout

Alfred is defined as files under `agent/`, following eve's filesystem-first model.

```
agent/
  agent.ts                     # runtime config (model selection)
  instructions.md              # always-on persona: formal British butler, no em dashes
  tools/
    get_weather.ts             # current weather via wttr.in
    get_news.ts                # latest BBC technology headlines via RSS
  skills/
    morning_report.md          # weather + news briefing
    daily_briefing.md          # meeting follow-ups (Notion) + weather + news + drafted emails
    email-reply-drafter.md     # draft replies in Will's voice
  connections/
    notion.ts                  # Notion MCP connection (user-scoped OAuth via Vercel Connect)
  channels/
    eve.ts                     # default eve channel (web / TUI / OIDC auth)
    slack.ts                   # Slack channel via Vercel Connect
  schedules/
    morning-report.ts          # posts the morning report to Slack at 08:00 America/New_York
```

## Getting started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

`eve dev` serves the agent locally (default `http://127.0.0.1:2000`). Note that schedules never fire on their cron cadence in dev. Trigger one manually with the dev dispatch route:

```bash
curl -X POST http://127.0.0.1:2000/eve/v1/dev/schedules/morning-report
```

## Configuration notes

### Model

The model is set in `agent/agent.ts` (currently `anthropic/claude-sonnet-5`, routed through the Vercel AI Gateway). Provide the relevant provider/API key in your environment.

### Slack channel

`agent/channels/slack.ts` uses a Vercel Connect client (`slack/alfred-bot`). Provision and point its trigger at eve's Slack route:

```bash
vercel connect create slack --triggers
vercel connect detach <uid> --yes
vercel connect attach <uid> --triggers --trigger-path /eve/v1/slack --yes
```

### Notion connection

`agent/connections/notion.ts` is a user-scoped MCP connection (`mcp.notion.com/notion`). Provision it with:

```bash
vercel connect create mcp.notion.com --name notion
vercel connect attach <connector-uid> --yes
vercel env pull
```

Because it is user-scoped, the first Notion call requires the user to authorise via OAuth. This means the `daily_briefing` skill works when triggered interactively by a signed-in user (for example, mentioning Alfred in Slack), but not from an unattended schedule, which has no user principal to authorise the sign-in.

### Schedules

Schedules become Vercel Cron Jobs on deploy and are evaluated in **UTC**. `morning-report` is set to `0 12 * * *`, which is 08:00 New York during EDT (UTC-4). Adjust the hour to `13` during EST (UTC-5) to keep it at 08:00 local, as eve/Vercel cron has no built-in timezone support.

## Deploy

```bash
VERCEL_USE_EXPERIMENTAL_FRAMEWORKS=1 vercel deploy --prod
```

The `VERCEL_USE_EXPERIMENTAL_FRAMEWORKS=1` flag lets the Vercel CLI recognise eve as a framework during the build. Ensure the project is linked (`vercel link`), the required environment variables are set in the Vercel project, and the Slack and Notion Connect clients are attached to that project. After deploying, confirm the cron jobs under **Settings → Cron Jobs**.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the eve dev server. |
| `npm run build` | Build the agent (`eve build`). |
| `npm run start` | Serve a built agent (`eve start`), which runs production schedules. |
| `npm run typecheck` | Type-check with `tsc`. |
