"use client";

import { useState } from "react";

export default function AICareerAssistant({ 
  context = "home", 
  customBadgeTag = "✦ Powered by Claude",
  title = "Ask anything about your job search",
  subtitle = "Resume tips, salary ranges, interview prep...",
  examplePrompts = [] 
}: { 
  context?: string,
  customBadgeTag?: string,
  title?: string,
  subtitle?: string,
  examplePrompts?: {label: string, prompt: string}[]
}) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setResponse("Thinking...");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: q }]
        })
      });
      const data = await res.json();
      if (data.content && data.content[0]) {
        setResponse(data.content[0].text);
      } else if (data.error) {
        setResponse("Error: " + data.error);
      } else {
        setResponse("Hmm, I couldn't understand that.");
      }
    } catch (e) {
      setResponse("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-panel">
      <div className="ai-badge">{customBadgeTag}</div>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: "#fff" }}>
        {title}
      </div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,.6)", marginBottom: 2 }}>
        {subtitle}
      </div>
      
      {response && (
        <div className={`ai-response ${loading ? "loading" : ""}`} style={{ display: "block" }}>
          {response}
        </div>
      )}
      
      <div className="ai-input-row">
        <input 
          className="ai-input" 
          placeholder="e.g. How should I negotiate salary?" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askAI(query)}
        />
        <button 
          className="ai-btn" 
          disabled={loading} 
          onClick={() => askAI(query)}
        >
          Ask →
        </button>
      </div>

      {examplePrompts.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
          {examplePrompts.map((ep, i) => (
            <button 
              key={i}
              onClick={() => {
                setQuery(ep.prompt);
                askAI(ep.prompt);
              }}
              style={{
                background: "rgba(255,255,255,.08)", 
                border: "1px solid rgba(255,255,255,.15)", 
                color: "rgba(255,255,255,.7)", 
                fontSize: 11, 
                padding: "4px 10px", 
                borderRadius: 6, 
                cursor: "pointer", 
                transition: "all .2s", 
                fontFamily: "var(--font-mono)"
              }}
            >
              {ep.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
