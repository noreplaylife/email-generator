"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setResult("");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    setResult(data.output || "No response");
    setLoading(false);
  }

  return (
    <main style={{ padding: 40, maxWidth: 800 }}>
      <h1>Agency Follow-up Email Generator</h1>

      <textarea
        placeholder="Paste client context here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
        style={{ width: "100%", marginTop: 20 }}
      />

      <button
        onClick={generate}
        disabled={loading}
        style={{ marginTop: 20, padding: "10px 20px" }}
      >
        {loading ? "Generating..." : "Generate Email"}
      </button>

      {result && (
        <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
          {result}
        </pre>
      )}
    </main>
 
