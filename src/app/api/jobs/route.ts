import { NextResponse } from 'next/server';
import { JOBS } from '@/data/jobs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase();
  const loc = searchParams.get('loc')?.toLowerCase();
  const type = searchParams.get('type')?.toLowerCase();
  const category = searchParams.get('category')?.toLowerCase();
  const company = searchParams.get('company')?.toLowerCase();

  let filteredJobs = [...JOBS];

  if (q) {
    filteredJobs = filteredJobs.filter(j => 
      (j.title + ' ' + j.company + ' ' + j.tags.join(' ') + ' ' + j.desc).toLowerCase().includes(q)
    );
  }
  
  if (loc) {
    filteredJobs = filteredJobs.filter(j => j.loc.toLowerCase().includes(loc));
  }

  if (type) {
    filteredJobs = filteredJobs.filter(j => j.type.toLowerCase().includes(type) || j.loc.toLowerCase().includes(type));
  }

  if (category) {
    filteredJobs = filteredJobs.filter(j => j.category.toLowerCase() === category);
  }

  if (company) {
    filteredJobs = filteredJobs.filter(j => j.company.toLowerCase() === company);
  }

  return NextResponse.json(filteredJobs);
}
