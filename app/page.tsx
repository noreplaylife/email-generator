"use client";

import { useState } from "react";

export default function Home() {
  const [industry, setIndustry] = useState("marketing agency");
  const [clientName, setClientName] = useState("John");
  const [lastContact, setLastContact] = useState("last week");
  const [goal, setGoal] = useState("get a reply and schedule a call");
  const [tone, setTone] = useState("friendly");
  const [result, setResult] = useState("");

  function generateEmail() {
    const email =
`Subject: Quick follow-up

Hi ${clientName},

Just following up from ${lastContact}. I wanted to check in and see where things stand.

My goal is to ${goal}. If it’s easier, just reply with a quick “yes” or “no” and I’ll take it from there.

Thanks,
Rick`;
    setResult(email);
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif", maxWidth: 800, margin: "0 auto" }}>
      <h1>Agency Follow-up Email Generator</h1>
      <p>If you can see this page, routing is fixed. Now we generate emails.</p>

      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <label>
          Industry
          <input value={industry} onChange={(e) => setIndustry(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </label>

        <label>
          Client name
          <input value={clientName} onChange={(e) => setClientName(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </label>

        <label>
          Last contact
          <input value={lastContact} onChange={(e) => setLastContact(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </label>

        <label>
          Goal
          <input value={goal} onChange={(e) => setGoal(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </label>

        <label>
          Tone
          <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ width: "100%", padding: 8 }}>
            <option value="friendly">Friendly</option>
            <option value="direct">Direct</option>
            <option value="firm">Firm</option>
          </select>
        </label>

        <button onClick={generateEmail} style={{ padding: 10, fontWeight: 600 }}>
          Generate Email
        </button>

        {result && (
          <pre style={{ whiteSpace: "pre-wrap", padding: 12, background: "#f4f4f4", borderRadius: 8 }}>
            {result}
          </pre>
        )}
      </div>
    </main>
  );
}
