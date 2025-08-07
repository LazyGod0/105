// src/app/api/proxy/route.ts

import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
  reservoir: 60,
  reservoirRefreshAmount: 60,
  reservoirRefreshInterval: 60 * 1000,
});

export async function POST(req: Request) {
  const { query, sessionId } = await req.json();

  const inputPayload: any = {
    prompt: query,
  };

  if (sessionId !== "") {
    inputPayload.session_id = sessionId;
  }

  const response = await limiter.schedule(() =>
    fetch(`${process.env.NEXT_PUBLIC_QWEN_DEEPBLUE_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_QWEN_DEEPBLUE_API_KEY}`,
        "X-DashScope-SSE": "enable"
      },
      body: JSON.stringify({
        input: inputPayload,
        parameters: {},
        debug: {}
      })
    })
  );

  if (!response.ok) {
    return new Response(JSON.stringify({ error: `HTTP error! Status: ${response.status}` }), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Handle streaming response
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data:")) {
            const dataStr = line.slice(5).trim();
            if (dataStr) {
              controller.enqueue(encoder.encode(`data:${dataStr}\n\n`));
            }
          }
        }
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}