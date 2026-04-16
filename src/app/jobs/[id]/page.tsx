"use client";

import { useEffect, useState, use } from "react";
import Navbar from "@/components/Navbar";
import { Job, JOBS } from "@/data/jobs";
import Link from "next/link";
import AICareerAssistant from "@/components/AICareerAssistant";

export default function JobDetail({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [job, setJob] = useState<Job | null>(null);
  const [prepResponse, setPrepResponse] = useState<string>("");
  const [loadingPrep, setLoadingPrep] = useState(false);
  const [toastStr, setToastStr] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastStr(msg);
    setTimeout(() => setToastStr(null), 2800);
  };

  useEffect(() => {
    const j = JOBS.find(x => x.id === parseInt(unwrappedParams.id));
    if (j) setJob(j);
  }, [unwrappedParams.id]);

  const getInterviewPrep = async () => {
    if (!job) return;
    setLoadingPrep(true);
    setPrepResponse("Generating prep notes...");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: "You are a career coach. Give concise, practical interview prep advice. Use bullet points. Keep it under 200 words.",
          messages: [{ role: "user", content: `Give me 5 specific interview prep tips for a ${job.title} role at ${job.company}. Include likely questions and key talking points. Role requirements: ${job.requirements.join(', ')}` }]
        })
      });
      const data = await res.json();
      if (data.content && data.content[0]) {
        setPrepResponse(data.content[0].text);
      } else {
        setPrepResponse("Notes not available.");
      }
    } catch (e) {
      setPrepResponse("Error loading notes.");
    } finally {
      setLoadingPrep(false);
    }
  };

  if (!job) return <div className="page active"><Navbar /><div>Loading...</div></div>;

  return (
    <div className="page active">
      <Navbar customRight={
        <>
          <button className="btn btn-outline btn-sm" onClick={() => showToast('Job saved!')}>Save Job</button>
          <button className="btn btn-gold btn-sm" onClick={() => showToast('Application submitted! 🎉')}>Apply Now →</button>
        </>
      } />
      
      <div style={{ overflowY: "auto", flex: 1 }}>
        <div className="detail-header">
          <div className="inner">
            <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
              <div className="company-logo" style={{ width: 64, height: 64, fontSize: 20, borderRadius: 14, flexShrink: 0 }}>{job.logo}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-head)", fontSize: "1.8rem", fontWeight: 700, letterSpacing: "-1px", marginBottom: 4 }}>{job.title}</div>
                <div style={{ color: "var(--ink3)", fontSize: 14, fontFamily: "var(--font-mono)", marginBottom: 12 }}>{job.company} · {job.loc} · {job.type}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {job.tags.map(t => <span key={t} className="badge badge-ink">{t}</span>)}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: "var(--font-head)", fontSize: "1.5rem", fontWeight: 700, color: "var(--teal)", letterSpacing: "-.5px" }}>{job.salary}</div>
                <div style={{ fontSize: 12, color: "var(--ink3)", fontFamily: "var(--font-mono)" }}>Posted {job.posted}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-body">
          <div>
            <div className="detail-section">
              <h3>About the Role</h3>
              <p>{job.desc} This is an exciting opportunity to work with a world-class team and make a significant impact. You will collaborate closely with product and engineering to ship high-quality work at scale. The role is a great fit for someone who thrives in a fast-paced environment and has a genuine passion for the craft.</p>
            </div>
            <div className="detail-section">
              <h3>Requirements</h3>
              <ul>{job.requirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </div>
            <div className="detail-section">
              <h3>What We Offer</h3>
              <ul>
                <li>Competitive salary & equity package</li>
                <li>Comprehensive health, dental & vision coverage</li>
                <li>Flexible PTO & remote-friendly culture</li>
                <li>$3,000 annual learning & development budget</li>
                <li>Home office setup stipend</li>
                <li>Regular team offsites and culture events</li>
              </ul>
            </div>
            <div style={{ background: "var(--bg3)", borderRadius: "var(--r-lg)", padding: "1.5rem", borderLeft: "3px solid var(--gold)" }}>
              <div className="ai-badge" style={{ background: "rgba(200,150,12,.12)", borderColor: "rgba(200,150,12,.2)", color: "var(--gold)", marginBottom: 10 }}>✦ AI Interview Prep</div>
              <div style={{ fontSize: 14, color: "var(--ink2)", marginBottom: 10 }}>Get AI-generated prep notes for this specific role</div>
              <button className="btn btn-outline btn-sm" onClick={getInterviewPrep} disabled={loadingPrep}>Prepare for This Interview</button>
              {prepResponse && (
                <div style={{ marginTop: 12, fontSize: 14, color: "var(--ink2)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                  {prepResponse}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="apply-card">
              <div className="apply-card-company">{job.company}</div>
              <div style={{ fontSize: 13, color: "var(--ink3)", fontFamily: "var(--font-mono)", marginBottom: "1.25rem" }}>{job.loc}</div>
              <button className="btn btn-gold" style={{ width: "100%", justifyContent: "center", marginBottom: 8, padding: 13 }} onClick={() => showToast('Application process started...')}>Apply Now ✦</button>
              <button className="btn btn-outline" style={{ width: "100%", justifyContent: "center" }} onClick={() => showToast('Job saved to your list!')}>♡ Save Job</button>
              <div style={{ borderTop: "1px solid var(--border)", margin: "1.25rem 0" }}></div>
              <div style={{ fontSize: 13, color: "var(--ink2)", display: "flex", flexDirection: "column", gap: 10, fontFamily: "var(--font-mono)" }}>
                <div style={{ display: "flex", gap: 8 }}><span style={{ color: "var(--ink3)" }}>Location</span><span style={{ marginLeft: "auto" }}>{job.loc}</span></div>
                <div style={{ display: "flex", gap: 8 }}><span style={{ color: "var(--ink3)" }}>Type</span><span style={{ marginLeft: "auto" }}>{job.type}</span></div>
                <div style={{ display: "flex", gap: 8 }}><span style={{ color: "var(--ink3)" }}>Salary</span><span style={{ marginLeft: "auto", color: "var(--teal)" }}>{job.salary}</span></div>
                <div style={{ display: "flex", gap: 8 }}><span style={{ color: "var(--ink3)" }}>Posted</span><span style={{ marginLeft: "auto" }}>{job.posted}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`toast ${toastStr ? 'show' : ''}`}>{toastStr}</div>
    </div>
  );
}
