"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import AICareerAssistant from "@/components/AICareerAssistant";
import { Job } from "@/data/jobs";
import Link from "next/link";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [catFilter, setCatFilter] = useState("");

  const fetchJobs = async () => {
    let url = "/api/jobs?";
    if (q) url += `q=${encodeURIComponent(q)}&`;
    if (loc) url += `loc=${encodeURIComponent(loc)}&`;
    if (typeFilter) url += `type=${encodeURIComponent(typeFilter)}&`;
    if (catFilter) url += `category=${encodeURIComponent(catFilter)}&`;
    
    const res = await fetch(url);
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, [typeFilter, catFilter]);

  const handleSearch = () => fetchJobs();
  const handleClear = () => {
    setQ(""); setLoc(""); setTypeFilter(""); setCatFilter("");
    setTimeout(fetchJobs, 0);
  };

  return (
    <div className="page active">
      <Navbar />
      <div style={{ flex: 1, overflowY: "auto" }}>
        
        {/* HERO */}
        <div className="hero">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot"></span>12,400+ verified positions updated daily
          </div>
          <h1>Find Work<br/>That <em>Moves You</em><br/>Forward</h1>
          <p>Search across tech, finance, design, healthcare and more — with AI that understands what you&apos;re really looking for.</p>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Job title, company, or keyword..." 
              style={{ flex: 2 }} 
              value={q} 
              onChange={e => setQ(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
            />
            <div className="search-sep"></div>
            <input 
              type="text" 
              placeholder="Location or Remote" 
              style={{ maxWidth: 200, flex: 1 }} 
              value={loc} 
              onChange={e => setLoc(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>Search Jobs</button>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-row">
          <div className="stat-item"><div className="stat-num">12.4K</div><div className="stat-label">Open Positions</div></div>
          <div className="stat-item"><div className="stat-num">3.8K</div><div className="stat-label">Companies</div></div>
          <div className="stat-item"><div className="stat-num">94%</div><div className="stat-label">Placement Rate</div></div>
          <div className="stat-item"><div className="stat-num">180+</div><div className="stat-label">Countries</div></div>
        </div>

        <div className="section">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "2rem", alignItems: "start" }}>
            <div>
              <div className="section-header">
                <span className="section-title">Browse by Category</span>
                <span className="section-sub">All Industries</span>
              </div>
              <div className="cat-grid">
                {[
                  { n: "Engineering", c: 3241, i:"⚙" }, { n: "Design", c: 1820, i:"◈" },
                  { n: "Marketing", c: 2100, i:"◉" }, { n: "Finance", c: 1540, i:"◆" },
                  { n: "Healthcare", c: 980, i:"✦" }, { n: "Sales", c: 1650, i:"▲" },
                  { n: "Data", c: 2080, i:"◬" }, { n: "Product", c: 890, i:"◍" }
                ].map(cat => (
                  <div key={cat.n} className="cat-item" onClick={() => setCatFilter(cat.n)}>
                    <span className="cat-icon">{cat.i}</span>
                    <div className="cat-name">{cat.n}</div>
                    <div className="cat-count">{cat.c.toLocaleString()} jobs</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* AI Assistant */}
            <div>
              <div className="section-header"><span className="section-title">AI Career Assistant</span></div>
              <AICareerAssistant 
                examplePrompts={[
                  { label: "PM skills?", prompt: "What skills do I need to become a product manager?" },
                  { label: "Cover letter tips", prompt: "How do I write a strong cover letter?" },
                  { label: "Salary check", prompt: "What is a fair salary for a Senior React developer in NYC?" }
                ]}
              />
            </div>
          </div>
        </div>

        {/* JOBS LIST */}
        <div className="section" style={{ paddingTop: 0 }}>
          <div className="section-header">
            <span className="section-title">Featured Openings</span>
            <button className="btn btn-ghost btn-sm" onClick={handleClear}>View all jobs →</button>
          </div>
          <div className="filters">
            <div className="pill-scroll">
              {['', 'Full-time', 'Remote', 'Contract', 'Part-time', 'Hybrid'].map(t => (
                <span key={t} className={`tag ${typeFilter === t ? 'active' : ''}`} onClick={() => setTypeFilter(t)}>
                  {t || 'All Types'}
                </span>
              ))}
            </div>
          </div>
          
          <div className="jobs-grid">
            {jobs.map(j => <JobCard key={j.id} job={j} />)}
          </div>
          
          {jobs.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem", color: "var(--ink3)" }}>
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>◎</div>
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>No jobs found</div>
              <div style={{ fontSize: 13 }}>Try adjusting your search or clearing filters</div>
              <button className="btn btn-outline btn-sm" style={{ marginTop: 16 }} onClick={handleClear}>Clear filters</button>
            </div>
          )}
        </div>

        {/* FEATURED COMPANIES */}
        <div className="section" style={{ paddingTop: 0 }}>
          <div className="section-header">
            <span className="section-title">Top Hiring Companies</span>
            <span className="section-sub">Actively posting</span>
          </div>
          <div className="companies-row">
            {['Stripe', 'Figma', 'OpenAI', 'Notion', 'Shopify', 'Google'].map(c => (
              <div key={c} className="company-pill" onClick={() => { setQ(c); handleSearch(); }}>{c}</div>
            ))}
          </div>
        </div>

        <footer style={{ borderTop: "1px solid var(--border)", padding: "2rem", textAlign: "center", color: "var(--ink3)", fontSize: 13, fontFamily: "var(--font-mono)", marginTop: "2rem" }}>
          © 2026 JobSphere · Built with care · <Link href="#" style={{ color: "var(--gold)", textDecoration: "none" }}>Privacy</Link> · <Link href="#" style={{ color: "var(--gold)", textDecoration: "none" }}>Terms</Link>
        </footer>
      </div>
    </div>
  );
}
