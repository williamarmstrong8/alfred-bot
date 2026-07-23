import { defineTool } from "eve/tools";
import { z } from "zod";

export default defineTool({
  description: "Get the current weather for a location.",
  inputSchema: z.object({ location: z.string() }),
  async execute({ location }) {
    const res = await fetch(`https://wttr.in/${location}?format=3`);
    return await res.text();
  },
});
