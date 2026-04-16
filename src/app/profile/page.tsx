"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const [toastStr, setToastStr] = useState<string | null>(null);
  const [summary, setSummary] = useState("Experienced product designer specializing in mobile and web applications. Passionate about user research, design systems, and building intuitive experiences that drive real business outcomes.");
  const [skills, setSkills] = useState(["Figma", "Sketch", "Prototyping", "User Research", "Design Systems", "React", "CSS", "Python", "SQL", "Motion Design"]);
  const [newSkill, setNewSkill] = useState("");
  const [resumeName, setResumeName] = useState("No file selected");
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const showToast = (msg: string) => {
    setToastStr(msg);
    setTimeout(() => setToastStr(null), 2800);
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
    showToast("Skill added!");
  };

  const aiImproveSummary = async () => {
    setLoadingAI(true);
    setAiResponse("Improving your summary...");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: "You improve professional LinkedIn-style summaries. Rewrite to be more compelling and specific. Under 80 words. No markdown.",
          messages: [{ role: "user", content: `Improve this summary: ${summary}` }]
        })
      });
      const data = await res.json();
      if (data.content && data.content[0]) {
        setAiResponse(data.content[0].text);
      } else {
        setAiResponse("Could not improve.");
      }
    } catch (e) {
      setAiResponse("Error trying to improve.");
    } finally {
      setLoadingAI(false);
    }
  };

  const useAiSummary = () => {
    setSummary(aiResponse);
    setAiResponse("");
    showToast("Summary updated!");
  };

  const reviewProfile = async () => {
    setLoadingAI(true);
    setAiResponse("Analyzing your profile...");
    showToast("Starting profile analysis...");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: "You are a career coach reviewing a job seeker's profile. Give 3 concise, actionable improvement tips. Be direct. Under 120 words.",
          messages: [{ role: "user", content: "Review this profile: Jane Smith, Senior Product Designer at Stripe (2021-present), previously at Airbnb. Skills: Figma, Prototyping, User Research, Design Systems, React. Profile strength 72%. 14 applications, 3 interviews." }]
        })
      });
      const data = await res.json();
      if (data.content && data.content[0]) {
        setAiResponse(data.content[0].text);
      } else {
        setAiResponse("Could not load.");
      }
    } catch (e) {
      setAiResponse("Error trying to analyze profile.");
    } finally {
        setLoadingAI(false);
    }
  };

  return (
    <div className="page active">
      <Navbar customRight={<button className="btn btn-gold btn-sm" onClick={() => showToast('Profile saved!')}>Save Profile</button>} />
      
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div className="profile-wrap">
          <div className="profile-left">
            <div className="card" style={{ textAlign: "center", padding: "1.75rem" }}>
              <div className="profile-avatar" style={{ margin: "0 auto 12px" }}>JS</div>
              <div className="profile-name">Jane Smith</div>
              <div className="profile-role" style={{ marginBottom: 10 }}>Product Designer · New York</div>
              <div style={{ marginBottom: 12 }}><span className="badge badge-teal">● Open to work</span></div>
              <button className="btn btn-outline btn-sm" style={{ width: "100%", justifyContent: "center" }} onClick={() => showToast('Photo upload coming soon')}>Change Photo</button>
            </div>
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Profile Strength</div>
              <div className="progress-bar" style={{ marginBottom: 6 }}><div className="progress-fill" style={{ width: "72%" }}></div></div>
              <div style={{ fontSize: 12, color: "var(--ink3)", fontFamily: "var(--font-mono)" }}>72% — Add resume to reach 90%</div>
            </div>
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>Quick Stats</div>
              <div style={{ fontSize: 13, color: "var(--ink2)", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span>Applications</span><span style={{ fontWeight: 600, fontFamily: "var(--font-head)", fontSize: 16 }}>14</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span>Interviews</span><span style={{ fontWeight: 600, fontFamily: "var(--font-head)", fontSize: 16, color: "var(--teal)" }}>3</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span>Saved Jobs</span><span style={{ fontWeight: 600, fontFamily: "var(--font-head)", fontSize: 16, color: "var(--gold)" }}>8</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span>Profile Views</span><span style={{ fontWeight: 600, fontFamily: "var(--font-head)", fontSize: 16 }}>127</span></div>
              </div>
            </div>
            
            <div className="ai-panel" style={{ padding: "1.25rem" }}>
              <div className="ai-badge" style={{ fontSize: 11, padding: "3px 10px", marginBottom: 10 }}>✦ AI Profile Review</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.8)", marginBottom: 10 }}>Get personalized feedback on your profile</div>
              <button className="ai-btn" style={{ width: "100%", justifyContent: "center" }} onClick={reviewProfile} disabled={loadingAI}>Analyze My Profile</button>
              {aiResponse && aiResponse.includes("Analysis:") ? ( // HACK to detect if it's the review response vs summary
                 <div className="ai-response" style={{ display: "block", marginTop: 10, fontSize: 13, whiteSpace: "pre-wrap" }}>{aiResponse}</div>
              ) : null}
            </div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="card">
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: "1.25rem", fontFamily: "var(--font-head)" }}>Personal Info</div>
              <div className="form-row">
                <div className="form-group"><label>First Name</label><input defaultValue="Jane" /></div>
                <div className="form-group"><label>Last Name</label><input defaultValue="Smith" /></div>
              </div>
              <div className="form-group"><label>Professional Headline</label><input defaultValue="Product Designer with 6 years experience" /></div>
              <div className="form-row">
                <div className="form-group"><label>Email</label><input defaultValue="jane@example.com" type="email" /></div>
                <div className="form-group"><label>Phone</label><input defaultValue="+1 555 123 4567" /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Location</label><input defaultValue="New York, NY" /></div>
                <div className="form-group"><label>LinkedIn URL</label><input placeholder="https://linkedin.com/in/..." /></div>
              </div>
            </div>

            <div className="card">
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: "1.25rem", fontFamily: "var(--font-head)" }}>About / Summary</div>
              <textarea rows={4} value={summary} onChange={e => setSummary(e.target.value)}></textarea>
              <button className="btn btn-outline btn-sm" style={{ marginTop: 10 }} onClick={aiImproveSummary} disabled={loadingAI}>✦ AI Improve Summary</button>
              {aiResponse && !aiResponse.includes("Analysis:") && (
                <div className="ai-response" style={{ display: "block", marginTop: 10, fontSize: 13, background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--ink2)" }}>
                  {aiResponse}
                  {aiResponse !== "Improving your summary..." && !aiResponse.startsWith("Error") && (
                    <div style={{ marginTop: 8 }}><button className="btn btn-gold btn-sm" onClick={useAiSummary}>Replace my summary</button></div>
                  )}
                </div>
              )}
            </div>

            <div className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <span style={{ fontSize: 16, fontWeight: 600, fontFamily: "var(--font-head)" }}>Resume / CV</span>
                <span className="badge badge-ink">PDF, DOCX · max 5MB</span>
              </div>
              <div className="upload-box" onClick={() => document.getElementById('resume-file')?.click()}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>↑</div>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Drop your resume here or click to upload</div>
                <div style={{ fontSize: 12, color: "var(--ink3)", fontFamily: "var(--font-mono)" }}>{resumeName}</div>
              </div>
              <input type="file" id="resume-file" accept=".pdf,.doc,.docx" style={{ display: "none" }} onChange={(e) => { if(e.target.files?.[0]) setResumeName('✓ ' + e.target.files[0].name); }} />
            </div>

            <div className="card">
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, fontFamily: "var(--font-head)" }}>Skills</div>
              <div className="skill-wrap">
                {skills.map(s => <span key={s} className="tag active" style={{ cursor: "default" }}>{s}</span>)}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <input type="text" placeholder="Add a skill..." style={{ flex: 1 }} value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()} />
                <button className="btn btn-outline btn-sm" onClick={addSkill}>+ Add</button>
              </div>
            </div>

            <div className="card">
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: "1.25rem", fontFamily: "var(--font-head)" }}>Work Experience</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ padding: 14, background: "var(--bg3)", borderRadius: "var(--r)", borderLeft: "3px solid var(--gold)" }}>
                  <div style={{ fontSize: 15, fontWeight: 600, fontFamily: "var(--font-head)" }}>Senior Product Designer</div>
                  <div style={{ fontSize: 13, color: "var(--gold)", fontFamily: "var(--font-mono)", marginBottom: 6 }}>Stripe · 2021 – Present</div>
                  <div style={{ fontSize: 13, color: "var(--ink2)" }}>Led design for Stripe&apos;s merchant dashboard, increasing task completion by 40%.</div>
                </div>
                <div style={{ padding: 14, background: "var(--bg3)", borderRadius: "var(--r)", borderLeft: "3px solid var(--teal)" }}>
                  <div style={{ fontSize: 15, fontWeight: 600, fontFamily: "var(--font-head)" }}>Product Designer</div>
                  <div style={{ fontSize: 13, color: "var(--teal)", fontFamily: "var(--font-mono)", marginBottom: 6 }}>Airbnb · 2018 – 2021</div>
                  <div style={{ fontSize: 13, color: "var(--ink2)" }}>Redesigned host onboarding flow, reducing drop-off by 28%.</div>
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 10 }} onClick={() => showToast('Experience editor coming soon')}>+ Add Experience</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`toast ${toastStr ? 'show' : ''}`}>{toastStr}</div>
    </div>
  );
}
