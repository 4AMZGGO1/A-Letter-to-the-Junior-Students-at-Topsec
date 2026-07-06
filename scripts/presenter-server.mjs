import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const notesPath = join(root, "src/data/speakerNotes.json");
const port = Number(process.env.PRESENTER_PORT ?? 5175);
const notes = JSON.parse(await readFile(notesPath, "utf8"));
const clients = new Set();

let state = {
  index: 0,
  id: notes[0]?.id ?? "opening",
  title: notes[0]?.title ?? "",
  total: notes.length,
};

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
}

function eventPayload() {
  const note = notes[state.index] ?? notes[0];
  return JSON.stringify({
    ...state,
    note,
    previous: state.index > 0 ? notes[state.index - 1] : null,
    next: state.index < notes.length - 1 ? notes[state.index + 1] : null,
  });
}

function broadcast() {
  const data = `data: ${eventPayload()}\n\n`;
  for (const res of clients) {
    res.write(data);
  }
}

async function saveNotes() {
  await writeFile(notesPath, `${JSON.stringify(notes, null, 2)}\n`, "utf8");
}

function presenterHtml() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>演讲稿提词器</title>
  <style>
    :root {
      color-scheme: dark;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #05070d;
      color: #f8fafc;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-height: 100vh;
      background:
        linear-gradient(115deg, rgba(34, 211, 238, 0.08), transparent 28%),
        linear-gradient(245deg, rgba(52, 211, 153, 0.07), transparent 30%),
        linear-gradient(180deg, #05070d 0%, #071018 48%, #05070d 100%);
    }

    main {
      display: grid;
      grid-template-rows: auto minmax(0, 1fr) auto;
      min-height: 100vh;
      padding: 24px;
      gap: 18px;
    }

    header, .note, footer {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.055);
      backdrop-filter: blur(14px);
      border-radius: 12px;
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
    }

    header {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 18px;
      align-items: end;
      padding: 16px 20px;
    }

    .eyebrow {
      margin: 0 0 8px;
      color: #a5f3fc;
      font-size: 14px;
      letter-spacing: 0.02em;
    }

    h1 {
      margin: 0;
      font-size: clamp(28px, 3.2vw, 44px);
      line-height: 1.12;
    }

    .counter {
      min-width: 128px;
      text-align: right;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 20px;
      color: #cbd5e1;
    }

    .note {
      min-height: 0;
      padding: clamp(22px, 3vw, 36px);
    }

    #script {
      display: block;
      width: 100%;
      height: calc(100vh - 250px);
      min-height: 0;
      margin: 0;
      border: 0;
      outline: 0;
      resize: none;
      background: transparent;
      max-width: none;
      font-size: clamp(24px, 2.65vw, 42px);
      line-height: 1.38;
      font-weight: 620;
      color: #f8fafc;
      font-family: inherit;
      overflow: auto;
    }

    #script:focus {
      color: #ecfeff;
    }

    .status {
      margin-top: 12px;
      color: #94a3b8;
      font-size: 14px;
    }

    footer {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
      padding: 14px 18px;
      color: #cbd5e1;
    }

    .preview-label {
      margin: 0 0 6px;
      color: #67e8f9;
      font-size: 14px;
    }

    .preview-title {
      margin: 0;
      font-size: 18px;
      line-height: 1.35;
    }

    @media (max-width: 720px) {
      main { padding: 16px; }
      header, footer { grid-template-columns: 1fr; }
      .counter { text-align: left; }
    }
  </style>
</head>
<body>
  <main>
    <header>
      <div>
        <p class="eyebrow">演讲稿同步提词器</p>
        <h1 id="title">等待演播界面同步</h1>
      </div>
      <div class="counter" id="counter">-- / --</div>
    </header>

    <section class="note" aria-live="polite">
      <div style="width: 100%">
        <textarea id="script" spellcheck="false">请保持主 PPT 页面打开。主 PPT 翻页后，这里会自动切换到对应讲稿。</textarea>
        <div class="status" id="status">可直接编辑，停顿后自动保存。</div>
      </div>
    </section>

    <footer>
      <section>
        <p class="preview-label">上一页</p>
        <p class="preview-title" id="previous">无</p>
      </section>
      <section>
        <p class="preview-label">下一页</p>
        <p class="preview-title" id="next">无</p>
      </section>
    </footer>
  </main>

  <script>
    let currentIndex = 0;
    let saveTimer = 0;
    let dirty = false;

    function render(payload) {
      const current = payload.note || {};
      currentIndex = payload.index || 0;
      document.title = "演讲稿 - " + (current.title || "同步中");
      document.getElementById("title").textContent = current.title || payload.title || "等待演播界面同步";
      document.getElementById("counter").textContent = String((payload.index || 0) + 1).padStart(2, "0") + " / " + String(payload.total || 0).padStart(2, "0");
      const script = document.getElementById("script");
      if (document.activeElement !== script || !dirty) {
        script.value = current.script || "暂无讲稿";
        dirty = false;
      }
      document.getElementById("previous").textContent = payload.previous?.title || "无";
      document.getElementById("next").textContent = payload.next?.title || "无";
    }

    async function saveCurrentScript() {
      const status = document.getElementById("status");
      const script = document.getElementById("script").value;
      status.textContent = "保存中...";
      const response = await fetch("/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index: currentIndex, script })
      });

      if (!response.ok) {
        status.textContent = "保存失败，请检查服务是否正常。";
        return;
      }

      dirty = false;
      status.textContent = "已保存。";
    }

    document.getElementById("script").addEventListener("input", () => {
      dirty = true;
      document.getElementById("status").textContent = "编辑中，停顿后自动保存...";
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => {
        saveCurrentScript().catch(() => {
          document.getElementById("status").textContent = "保存失败，请检查服务是否正常。";
        });
      }, 700);
    });

    async function loadInitial() {
      const response = await fetch("/state");
      render(await response.json());
    }

    loadInitial().catch(() => {});

    const events = new EventSource("/events");
    events.onmessage = (event) => render(JSON.parse(event.data));
  </script>
</body>
</html>`;
}

const server = createServer(async (req, res) => {
  cors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(presenterHtml());
    return;
  }

  if (req.method === "GET" && req.url === "/state") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(eventPayload());
    return;
  }

  if (req.method === "GET" && req.url === "/events") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    });
    res.write(`data: ${eventPayload()}\n\n`);
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  if (req.method === "POST" && req.url === "/state") {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const incoming = JSON.parse(body);
        const index = Number(incoming.index);
        if (Number.isInteger(index) && index >= 0 && index < notes.length) {
          state = {
            index,
            id: incoming.id ?? notes[index].id,
            title: incoming.title ?? notes[index].title,
            total: Number(incoming.total) || notes.length,
          };
          broadcast();
        }
        res.writeHead(204);
        res.end();
      } catch {
        res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  if (req.method === "POST" && req.url === "/note") {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const incoming = JSON.parse(body);
        const index = Number(incoming.index);
        if (!Number.isInteger(index) || index < 0 || index >= notes.length || typeof incoming.script !== "string") {
          res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
          res.end(JSON.stringify({ error: "Invalid note payload" }));
          return;
        }

        notes[index] = {
          ...notes[index],
          script: incoming.script,
        };
        await saveNotes();
        broadcast();
        res.writeHead(204);
        res.end();
      } catch {
        res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Presenter notes: http://127.0.0.1:${port}/`);
});
