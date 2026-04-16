"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [toastStr, setToastStr] = useState<string | null>(null);
  const router = useRouter();

  const showToast = (msg: string) => {
    setToastStr(msg);
    setTimeout(() => setToastStr(null), 2800);
  };

  const doLogin = () => {
    showToast('Welcome back! Signed in successfully.');
    setTimeout(() => router.push('/'), 800);
  };

  const doSignup = () => {
    showToast('Account created! Welcome to JobSphere.');
    setTimeout(() => router.push('/profile'), 900);
  };

  return (
    <div className="page active">
      <Navbar hideCenter customRight={<button className="btn btn-ghost btn-sm" onClick={() => router.push('/')}>← Home</button>} />
      
      <div className="auth-bg"></div>
      <div className="auth-wrap">
        <div className="auth-card">
          <div className="auth-title">Welcome back</div>
          <div className="auth-sub">Sign in or create your free account</div>
          
          <div className="tabs">
            <div className={`tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>Sign In</div>
            <div className={`tab ${tab === "signup" ? "active" : ""}`} onClick={() => setTab("signup")}>Create Account</div>
          </div>
          
          {tab === "login" && (
            <div>
              <div className="form-group"><label>Email address</label><input type="email" placeholder="you@example.com" /></div>
              <div className="form-group"><label>Password</label><input type="password" placeholder="Enter password" /></div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: 6, margin: 0, cursor: "pointer", fontSize: 13, fontWeight: 400 }}>
                  <input type="checkbox" style={{ width: "auto", accentColor: "var(--gold)" }} /> Remember me
                </label>
                <a href="#" style={{ fontSize: 13, color: "var(--gold)", textDecoration: "none" }}>Forgot password?</a>
              </div>
              <button className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }} onClick={doLogin}>Sign In →</button>
              
              <div className="divider">or continue with</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <button className="btn btn-outline" style={{ justifyContent: "center" }} onClick={() => showToast('Google login coming soon')}>Google</button>
                <button className="btn btn-outline" style={{ justifyContent: "center" }} onClick={() => showToast('GitHub login coming soon')}>GitHub</button>
              </div>
            </div>
          )}

          {tab === "signup" && (
            <div>
              <div className="form-row">
                <div className="form-group"><label>First name</label><input type="text" placeholder="Jane" /></div>
                <div className="form-group"><label>Last name</label><input type="text" placeholder="Smith" /></div>
              </div>
              <div className="form-group"><label>Email address</label><input type="email" placeholder="you@example.com" /></div>
              <div className="form-group"><label>Password</label><input type="password" placeholder="Create a strong password" /></div>
              <div className="form-group">
                <label>I am a...</label>
                <select><option>Job Seeker</option><option>Employer / Recruiter</option></select>
              </div>
              <button className="btn btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: ".5rem" }} onClick={doSignup}>Create Account →</button>
            </div>
          )}
        </div>
      </div>
      
      <div className={`toast ${toastStr ? 'show' : ''}`}>{toastStr}</div>
    </div>
  );
}
