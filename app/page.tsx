"use client";

import { useState } from "react";

export default function Home() {
  const [industry, setIndustry] = useState("marketing agency");
  const [clientName, setClientName] = useState("John");
  const [lastContact, setLastContact] = useState("last week");
  const [goal, setGoal] = useState("get a reply and schedule a call");
  const [tone, setTone] = useState("Friendly");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, clientName, lastContact, goal, tone }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Request failed");
      setResult(data?.email || "");
    } catch (e: any) {
      setError(e?.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
  }

  return (
    <main style={{ padding: 24, maxWidth: 720, fontFamily: "system-ui, sans-serif" }}>
      <h1>Agency Follow-up Email Generator (LIVE TEST)</h1>
      <p>If you can see “LIVE TEST”, your deploy updated.</p>

      <div style={{ marginTop: 18 }}>
        <label>Industry</label>
        <br />
        <input value={industry} onChange={(e) => setIndustry(e.target.value)} style={{ width: "100%", padding: 8 }} />
      </div>

      <div style={{ marginTop: 18 }}>
        <label>Client name</label>
        <br />
        <input value={clientName} onChange={(e) => setClientName(e.target.value)} style={{ width: "100%", padding: 8 }} />
      </div>

      <div style={{ marginTop: 18 }}>
        <label>Last contact</label>
        <br />
        <input value={lastContact} onChange={(e) => setLastContact(e.target.value)} style={{ width: "100%", padding: 8 }} />
      </div>

      <div style={{ marginTop: 18 }}>
        <label>Goal</label>
        <br />
        <input value={goal} onChange={(e) => setGoal(e.target.value)} style={{ width: "100%", padding: 8 }} />
      </div>

      <div style={{ marginTop: 18 }}>
        <label>Tone</label>
        <br />
        <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ width: "100%", padding: 8 }}>
          <option>Friendly</option>
          <option>Professional</option>
          <option>Direct</option>
          <option>Warm</option>
          <option>Short</option>
          <option>Firm</option>
        </select>
      </div>

      <div style={{ marginTop: 22, display: "flex", gap: 10 }}>
        <button onClick={handleGenerate} disabled={loading} style={{ padding: "10px 14px" }}>
          {loading ? "Generating..." : "Generate Email"}
        </button>

        <button onClick={handleCopy} disabled={!result} style={{ padding: "10px 14px" }}>
          Copy email
        </button>
      </div>

      {error ? (
        <pre style={{ marginTop: 18, color: "crimson", whiteSpace: "pre-wrap" }}>{error}</pre>
      ) : null}

      {result ? (
        <pre style={{ marginTop: 18, whiteSpace: "pre-wrap", padding: 12, border: "1px solid #ddd" }}>{result}</pre>
      ) : null}
    </main>
  );
}
