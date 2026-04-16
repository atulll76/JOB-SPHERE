export interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  type: string;
  loc: string;
  salary: string;
  tags: string[];
  desc: string;
  requirements: string[];
  category: string;
  posted: string;
  featured: boolean;
}

export const JOBS: Job[] = [
  {id:1,title:"Senior Frontend Engineer",company:"Stripe",logo:"ST",type:"Full-time",loc:"Remote",salary:"$130K – $170K",tags:["React","TypeScript","GraphQL"],desc:"Build world-class payment interfaces used by millions. Join our core product team.",requirements:["5+ years React experience","TypeScript expertise","Experience with design systems","Strong CS fundamentals"],category:"Engineering",posted:"2 days ago",featured:true},
  {id:2,title:"Product Designer",company:"Figma",logo:"FG",type:"Hybrid",loc:"San Francisco, CA",salary:"$120K – $150K",tags:["Figma","Prototyping","UI/UX"],desc:"Shape the tools that designers use worldwide. Own end-to-end product design experiences.",requirements:["4+ years product design","Portfolio of shipped work","Experience with B2B SaaS","Excellent collaboration skills"],category:"Design",posted:"3 days ago",featured:true},
  {id:3,title:"Machine Learning Engineer",company:"OpenAI",logo:"OA",type:"Full-time",loc:"San Francisco, CA",salary:"$180K – $250K",tags:["Python","PyTorch","LLMs"],desc:"Work on cutting-edge AI models that push the boundaries of what's possible.",requirements:["PhD or 5+ yrs ML experience","Strong Python skills","Published research a plus","Familiarity with large-scale systems"],category:"Data",posted:"1 day ago",featured:false},
  {id:4,title:"Growth Marketing Manager",company:"Notion",logo:"NT",type:"Full-time",loc:"Remote",salary:"$95K – $130K",tags:["SEO","Paid Ads","Analytics"],desc:"Own user acquisition across all channels. Build and scale programs from scratch.",requirements:["3+ years growth marketing","Proficient in GA4, Mixpanel","Paid search/social experience","Data-driven mindset"],category:"Marketing",posted:"5 days ago",featured:false},
  {id:5,title:"Staff Backend Engineer",company:"Shopify",logo:"SH",type:"Full-time",loc:"Remote (Canada)",salary:"$160K – $200K",tags:["Ruby","Go","Kafka","Kubernetes"],desc:"Design and build scalable systems that power millions of merchants globally.",requirements:["8+ years backend experience","Distributed systems expertise","Experience with high-traffic platforms","Strong technical leadership"],category:"Engineering",posted:"1 week ago",featured:false},
  {id:6,title:"Data Analyst",company:"Airbnb",logo:"AB",type:"Hybrid",loc:"New York, NY",salary:"$90K – $120K",tags:["SQL","Python","Tableau"],desc:"Turn complex data into clear insights that drive critical business decisions.",requirements:["3+ years data analysis","Advanced SQL skills","Experience with BI tools","Strong storytelling ability"],category:"Data",posted:"4 days ago",featured:false},
  {id:7,title:"Sales Development Rep",company:"HubSpot",logo:"HS",type:"Full-time",loc:"Boston, MA",salary:"$55K – $75K + bonus",tags:["Outreach","CRM","SaaS Sales"],desc:"Generate pipeline for our enterprise sales team. High-growth role with clear advancement path.",requirements:["1+ year SDR experience","Excellent communication","Self-motivated & resilient","SaaS experience preferred"],category:"Sales",posted:"3 days ago",featured:false},
  {id:8,title:"Contract UX Researcher",company:"Google",logo:"GG",type:"Contract",loc:"Remote",salary:"$85 – $110/hr",tags:["User Testing","Usability","Quant Research"],desc:"Lead mixed-methods research for Google Maps. 6-month contract with extension possibility.",requirements:["4+ years UX research","Mixed-methods expertise","Experience with large scale products","Portfolio required"],category:"Design",posted:"6 days ago",featured:false},
];
