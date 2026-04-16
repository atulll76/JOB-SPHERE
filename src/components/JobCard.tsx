import Link from "next/link";
import { Job } from "@/data/jobs";

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className={`job-card ${job.featured ? 'featured' : ''}`}>
      <div className="company-logo">{job.logo}</div>
      <div className="job-info">
        <div className="job-title">
          {job.title}
          {job.featured && <span className="badge badge-gold" style={{ marginLeft: 8, fontSize: 11 }}>Featured</span>}
        </div>
        <div className="job-meta">
          <span>{job.company}</span><span>·</span>
          <span>{job.loc}</span><span>·</span>
          <span>{job.type}</span>
        </div>
        <div className="job-tags">
          {job.tags.map(t => (
            <span key={t} className="badge badge-ink">{t}</span>
          ))}
        </div>
      </div>
      <div className="job-right">
        <span className="job-salary">{job.salary}</span>
        <span className="job-time">{job.posted}</span>
        <span className="btn btn-outline btn-sm">View →</span>
      </div>
    </Link>
  );
}
