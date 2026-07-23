import { defineSchedule } from "eve/schedules";

import slack from "../channels/slack";

// 08:00 America/New_York. Vercel evaluates cron in UTC, so this is set for EDT
// (UTC-4). During EST (UTC-5) change the hour to 13 to keep it at 08:00 local.
export default defineSchedule({
  cron: "0 12 * * *",
  async run({ receive, waitUntil, appAuth }) {
    waitUntil(
      receive(slack, {
        message:
          "Load and follow the morning_report skill. Prepare today's morning report from the weather and the news, and post it here.",
        target: { channelId: "C0BK8A0LHPX" },
        auth: appAuth,
      }),
    );
  },
});
