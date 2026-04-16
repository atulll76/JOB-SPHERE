"use client";

import Navbar from "@/components/Navbar";
import AICareerAssistant from "@/components/AICareerAssistant";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EmployerDashboard() {
  const router = useRouter();
  const [toastStr, setToastStr] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastStr(msg);
    setTimeout(() => setToastStr(null), 2800);
  };

  return (
    <div className="page active">
      <Navbar customRight={<button className="btn btn-gold btn-sm" onClick={() => router.push('/employer/post')}>+ Post New Job</button>} />
      
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div className="employer-dash">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
            <div>
              <div style={{ fontFamily: "var(--font-head)", fontSize: "1.8rem", fontWeight: 700, letterSpacing: "-1px" }}>Employer Dashboard</div>
              <div style={{ color: "var(--ink3)", fontSize: 13, fontFamily: "var(--font-mono)" }}>Acme Corp · Last updated today</div>
            </div>
            <div style={{ minWidth: 320 }}>
              <AICareerAssistant 
                context="employer" 
                customBadgeTag="✦ Hiring Insights" 
                title="Ask AI about your hiring pipeline" 
                subtitle="e.g. How to improve application quality?" 
              />
            </div>
          </div>

          <div className="metric-row">
            <div className="metric-card">
              <div className="metric-val">3</div>
              <div className="metric-label">Active Listings</div>
              <div className="metric-change">↑ 1 this week</div>
              <div className="sparkline" style={{ marginTop: 10 }}></div>
            </div>
            <div className="metric-card">
              <div className="metric-val">47</div>
              <div className="metric-label">Total Applicants</div>
              <div className="metric-change">↑ 12 this week</div>
              <div className="sparkline" style={{ marginTop: 10 }}></div>
            </div>
            <div className="metric-card">
              <div className="metric-val">12</div>
              <div className="metric-label">Shortlisted</div>
              <div className="metric-change">↑ 4 this week</div>
            </div>
            <div className="metric-card">
              <div className="metric-val">4.2K</div>
              <div className="metric-label">Profile Views</div>
              <div className="metric-change">↑ 18% vs last month</div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: 16, fontWeight: 600, fontFamily: "var(--font-head)" }}>Active Job Listings</span>
              <button className="btn btn-outline btn-sm" onClick={() => router.push('/employer/post')}>+ New Listing</button>
            </div>
            <table className="apps-table">
              <thead><tr><th>Title</th><th>Posted</th><th>Applicants</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                <tr><td style={{ fontWeight: 500, fontFamily: "var(--font-head)" }}>Senior Frontend Engineer</td><td style={{ color: "var(--ink3)", fontFamily: "var(--font-mono)", fontSize: 13 }}>3 days ago</td><td><span className="badge badge-gold">24 applied</span></td><td><span className="badge badge-teal">Active</span></td><td><button className="btn btn-ghost btn-sm" onClick={() => showToast('Viewing applicants...')}>View →</button></td></tr>
                <tr><td style={{ fontWeight: 500, fontFamily: "var(--font-head)" }}>Product Manager</td><td style={{ color: "var(--ink3)", fontFamily: "var(--font-mono)", fontSize: 13 }}>1 week ago</td><td><span className="badge badge-gold">18 applied</span></td><td><span className="badge badge-teal">Active</span></td><td><button className="btn btn-ghost btn-sm" onClick={() => showToast('Viewing applicants...')}>View →</button></td></tr>
                <tr><td style={{ fontWeight: 500, fontFamily: "var(--font-head)" }}>UX Researcher</td><td style={{ color: "var(--ink3)", fontFamily: "var(--font-mono)", fontSize: 13 }}>2 weeks ago</td><td><span className="badge badge-gold">5 applied</span></td><td><span className="badge badge-rust">Closing Soon</span></td><td><button className="btn btn-ghost btn-sm" onClick={() => showToast('Viewing applicants...')}>View →</button></td></tr>
              </tbody>
            </table>
          </div>

          <div className="card">
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: "1.25rem", fontFamily: "var(--font-head)" }}>Recent Applicants</div>
            <table className="apps-table">
              <thead><tr><th>Candidate</th><th>Role</th><th>Experience</th><th>AI Match</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                <tr>
                  <td><div style={{ fontWeight: 500 }}>Alex Chen</div><div style={{ fontSize: 12, color: "var(--ink3)", fontFamily: "var(--font-mono)" }}>alex@email.com</div></td>
                  <td style={{ color: "var(--ink2)", fontSize: 13 }}>Sr. Frontend Eng.</td>
                  <td style={{ color: "var(--ink2)", fontSize: 13, fontFamily: "var(--font-mono)" }}>6 yrs</td>
                  <td><span className="badge badge-teal">94%</span></td>
                  <td><span className="badge badge-gold">Interview</span></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => showToast('Opening profile...')}>View →</button></td>
                </tr>
                <tr>
                  <td><div style={{ fontWeight: 500 }}>Sara Kim</div><div style={{ fontSize: 12, color: "var(--ink3)", fontFamily: "var(--font-mono)" }}>sara@email.com</div></td>
                  <td style={{ color: "var(--ink2)", fontSize: 13 }}>Product Manager</td>
                  <td style={{ color: "var(--ink2)", fontSize: 13, fontFamily: "var(--font-mono)" }}>4 yrs</td>
                  <td><span className="badge badge-teal">87%</span></td>
                  <td><span className="badge badge-ink">Review</span></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => showToast('Opening profile...')}>View →</button></td>
                </tr>
                <tr>
                  <td><div style={{ fontWeight: 500 }}>James Wu</div><div style={{ fontSize: 12, color: "var(--ink3)", fontFamily: "var(--font-mono)" }}>james@email.com</div></td>
                  <td style={{ color: "var(--ink2)", fontSize: 13 }}>Sr. Frontend Eng.</td>
                  <td style={{ color: "var(--ink2)", fontSize: 13, fontFamily: "var(--font-mono)" }}>8 yrs</td>
                  <td><span className="badge badge-teal">91%</span></td>
                  <td><span className="badge badge-gold">Interview</span></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => showToast('Opening profile...')}>View →</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className={`toast ${toastStr ? 'show' : ''}`}>{toastStr}</div>
    </div>
  );
}
