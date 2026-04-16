"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function PostJobPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [toastStr, setToastStr] = useState<string | null>(null);
  
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-time");
  const [loc, setLoc] = useState("On-site");
  const [smin, setSmin] = useState("");
  const [smax, setSmax] = useState("");
  const [city, setCity] = useState("");
  const [desc, setDesc] = useState("");
  const [skills, setSkills] = useState("");
  const [company, setCompany] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiDesc, setAiDesc] = useState("");

  const showToast = (msg: string) => {
    setToastStr(msg);
    setTimeout(() => setToastStr(null), 2800);
  };

  const publishJob = () => {
    showToast('✦ Job posted successfully!');
    setTimeout(() => router.push('/employer'), 900);
  };

  const generateAI = async () => {
    setLoadingAI(true);
    setAiDesc("Writing your job description...");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: "You write professional job descriptions. Keep it under 100 words. No markdown.",
          messages: [{ role: "user", content: `Write a job description for: ${title||'Software Engineer'}, ${type}, based in ${city||'Remote'}. Focus on impact.` }]
        })
      });
      const data = await res.json();
      if (data.content && data.content[0]) setAiDesc(data.content[0].text);
      else setAiDesc("Could not generate.");
    } catch (e) {
      setAiDesc("Error generating description.");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="page active">
      <Navbar customRight={<button className="btn btn-gold btn-sm" onClick={() => router.push('/employer')}>View Dashboard →</button>} />
      
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div className="post-wrap">
          <div className="post-title">Post a Job</div>
          <div className="post-sub">Reach thousands of qualified candidates across all industries</div>
          
          <div className="step-bar">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className={`step ${step > n ? 'done' : step === n ? 'active' : ''}`}>
                {n} · {n===1?'Role':n===2?'Reqs':n===3?'Company':'Review'}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="card">
              <div className="form-group"><label>Job Title *</label><input type="text" placeholder="e.g. Senior Product Designer" value={title} onChange={e => setTitle(e.target.value)} /></div>
              <div className="form-row">
                <div className="form-group"><label>Employment Type</label><select value={type} onChange={e => setType(e.target.value)}><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Freelance</option></select></div>
                <div className="form-group"><label>Work Location</label><select value={loc} onChange={e => setLoc(e.target.value)}><option>On-site</option><option>Remote</option><option>Hybrid</option></select></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Salary Min ($/yr)</label><input type="number" placeholder="60000" value={smin} onChange={e => setSmin(e.target.value)} /></div>
                <div className="form-group"><label>Salary Max ($/yr)</label><input type="number" placeholder="90000" value={smax} onChange={e => setSmax(e.target.value)} /></div>
              </div>
              <div className="form-group"><label>City / Location</label><input type="text" placeholder="New York, NY or Remote" value={city} onChange={e => setCity(e.target.value)} /></div>
              <div className="form-group"><label>Job Description *</label><textarea rows={5} placeholder="Describe the role..." value={desc} onChange={e => setDesc(e.target.value)}></textarea></div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <button className="btn btn-outline btn-sm" onClick={generateAI} disabled={loadingAI}>✦ AI Generate Description</button>
                <button className="btn btn-gold" onClick={() => setStep(2)}>Next: Requirements →</button>
              </div>

              {aiDesc && (
                <div className="ai-panel" style={{ marginTop: "1rem" }}>
                  <div className="ai-badge">✦ AI Writing Assistant</div>
                  <div className={`ai-response ${loadingAI ? 'loading' : ''}`} style={{ display: "block" }}>{aiDesc}</div>
                  {!loadingAI && aiDesc !== "Error generating description." && (
                    <button className="ai-btn" style={{ marginTop: 10 }} onClick={() => { setDesc(aiDesc); setAiDesc(""); showToast("Description added!"); }}>Use this description</button>
                  )}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="card">
              <div className="form-group"><label>Required Skills (comma separated)</label><input type="text" placeholder="React, TypeScript, Figma" value={skills} onChange={e => setSkills(e.target.value)} /></div>
              <div className="form-group"><label>Experience Level</label><select><option>Entry Level</option><option>Mid Level</option><option>Senior</option></select></div>
              <div className="form-group"><label>Education Requirement</label><select><option>No requirement</option><option>Bachelor's degree</option></select></div>
              <div className="form-group"><label>Requirements (one per line)</label><textarea rows={4} placeholder="5+ years of experience"></textarea></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                <button className="btn btn-gold" onClick={() => setStep(3)}>Next: Company Info →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="card">
              <div className="form-group"><label>Company Name *</label><input type="text" placeholder="Acme Corp" value={company} onChange={e => setCompany(e.target.value)} /></div>
              <div className="form-group"><label>Industry</label><select><option>Technology</option><option>Finance</option><option>Healthcare</option></select></div>
              <div className="form-row">
                <div className="form-group"><label>Company Size</label><select><option>1–10</option><option>11–50</option><option>51–200</option></select></div>
                <div className="form-group"><label>Company Website</label><input type="url" placeholder="https://yourcompany.com" /></div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button className="btn btn-outline" onClick={() => setStep(2)}>← Back</button>
                <button className="btn btn-gold" onClick={() => setStep(4)}>Review & Post →</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="card">
              <div style={{ fontSize: 18, fontWeight: 600, fontFamily: "var(--font-head)", marginBottom: "1.25rem" }}>Review Your Listing</div>
              <div style={{ background: "var(--bg3)", borderRadius: "var(--r-lg)", padding: "1.5rem", marginBottom: "1.25rem", borderLeft: "3px solid var(--gold)" }}>
                <div style={{ fontFamily: "var(--font-head)", fontSize: "1.3rem", fontWeight: 600, marginBottom: 4 }}>{title || "(untitled)"}</div>
                <div style={{ color: "var(--ink3)", fontSize: 13, fontFamily: "var(--font-mono)" }}>{company || "(company)"} · {city || "(location)"} · {type} · {smin && smax ? `$${smin} – $${smax}` : 'Not specified'}</div>
              </div>
              <div style={{ fontSize: 13, color: "var(--ink3)", marginBottom: 6, fontFamily: "var(--font-mono)" }}>Description</div>
              <div style={{ fontSize: 14, marginBottom: "1.25rem", padding: 14, background: "var(--bg3)", borderRadius: "var(--r)", lineHeight: 1.7, color: "var(--ink2)" }}>{desc || "No description provided."}</div>
              <div style={{ fontSize: 13, color: "var(--ink3)", marginBottom: 8, fontFamily: "var(--font-mono)" }}>Required Skills</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {skills ? skills.split(',').map((s, i) => <span key={i} className="badge badge-ink">{s.trim()}</span>) : <span className="badge badge-ink">None</span>}
              </div>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", marginTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button className="btn btn-outline" onClick={() => setStep(3)}>← Edit Details</button>
                <button className="btn btn-gold btn-lg" onClick={publishJob}>✦ Publish Job Listing</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={`toast ${toastStr ? 'show' : ''}`}>{toastStr}</div>
    </div>
  );
}
