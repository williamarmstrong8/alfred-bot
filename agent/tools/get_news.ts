import { defineTool } from "eve/tools";
import { z } from "zod";

export default defineTool({
  description: "Get the 3 most recent BBC technology headlines and summaries.",
  inputSchema: z.object({}),
  async execute() {
    const res = await fetch("https://feeds.bbci.co.uk/news/technology/rss.xml");
    const xml = await res.text();
    const clean = (s: string | undefined) =>
      s?.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 3).map((m) => ({
      title: clean(m[1].match(/<title>([\s\S]*?)<\/title>/)?.[1]),
      description: clean(m[1].match(/<description>([\s\S]*?)<\/description>/)?.[1]),
    }));
  },
});
