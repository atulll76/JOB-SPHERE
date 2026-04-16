"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar({ hideCenter = false, customRight }: { hideCenter?: boolean, customRight?: React.ReactNode }) {
  const pathname = usePathname();
  const [toastStr, setToastStr] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastStr(msg);
    setTimeout(() => setToastStr(null), 2800);
  };

  return (
    <>
      <nav>
        <Link href="/" className="logo">
          <span className="logo-dot"></span>JobSphere
        </Link>
        
        {!hideCenter && (
          <div className="nav-center">
            <Link href="/" className={`nav-btn ${pathname === '/' ? 'active' : ''}`}>
              Browse Jobs
            </Link>
            <Link href="/employer/post" className={`nav-btn ${pathname === '/employer/post' ? 'active' : ''}`}>
              Post a Job
            </Link>
            <Link href="/employer" className={`nav-btn ${pathname === '/employer' ? 'active' : ''}`}>
              Dashboard
            </Link>
          </div>
        )}

        <div className="nav-right">
          {customRight ? customRight : (
            <>
              <Link href="/auth" className="btn btn-outline btn-sm">
                Sign In
              </Link>
              <Link href="/auth" className="btn btn-gold btn-sm">
                Get Started →
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Global Toast Placeholder inside Nav for simplicity */}
      <div className={`toast ${toastStr ? 'show' : ''}`}>
        {toastStr}
      </div>
    </>
  );
}
