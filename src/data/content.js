/* =========================================================================
   SITE CONTENT
   Single source of truth for all editable copy, links and lists.
   ========================================================================= */

// ---- Personal / identity ---------------------------------------------------
export const profile = {
  name: 'Saanvi Tondak',
  firstName: 'Saanvi',
  lastName: 'Tondak',
  monogram: 'ST',
  roles: ['Data Scientist', 'Founder'],
  email: 'e1157202@u.nus.edu',
  location: 'Singapore',
  // Drop your resume PDF at /public/resume.pdf (see README).
  resumeUrl: '/resume.pdf',
};

// ---- Social links ----------------------------------------------------------
export const socials = [
  { label: 'GitHub', href: 'https://github.com/SaanviTondak', icon: 'github' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/saanvi-tondak-a0407a321',
    icon: 'linkedin',
  },
];

// Footer social list.
export const footerSocials = [
  { label: 'Github', href: 'https://github.com/SaanviTondak' },
  { label: 'Linkedin', href: 'https://www.linkedin.com/in/saanvi-tondak-a0407a321' },
];

// ---- Navigation ------------------------------------------------------------
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

// ---- About / experience timeline ------------------------------------------
export const timeline = [
  {
    year: '2026',
    role: 'Data Scientist Intern',
    sub: 'GovTech Singapore',
    description:
      'Built the AI brain behind government security audits, turning days of manual question drafting into seconds of traceable, agent generated insight.',
  },
  {
    year: '2025',
    role: 'Automation & Tech Intern',
    sub: 'World Technologies',
    description:
      'Replaced a manual marketing grind with self running agentic AI, then shipped an entire company website solo from front end to back end.',
  },
  {
    year: '2025',
    role: 'Business Analyst Intern',
    sub: 'Ernst & Young (EY)',
    description:
      'Turned messy customer data into clean pipelines and the dashboards leadership actually opens, on a national scale CRM rollout.',
  },
  {
    year: '2025',
    role: 'Associate Consultant',
    sub: 'Yale-NUS Consulting Group',
    description:
      'Cracked open new Southeast Asian markets for a plant based beverage brand with data driven segmentation and a sharp go to market playbook.',
  },
  {
    year: '2024',
    role: 'Co-Founder & Head of Technology',
    sub: 'Project Bambubuyog',
    description:
      'Co founded a social venture connecting rural farmers to market through a honey and beehive marketplace, now scaling across the region.',
  },
  {
    year: '2023',
    role: 'B.Sc. Business Analytics (Computing), Hons.',
    sub: 'National University of Singapore',
    description:
      'Honours track Business Analytics at NUS College, specializing in machine learning with a second major in quantitative finance.',
  },
];

// ---- Work / projects -------------------------------------------------------
export const projects = [
  {
    index: '01',
    name: 'AI Audit RAG System',
    category: 'AI / LLM',
    tech: ['Python', 'RAG', 'Multi-Agent', 'Databricks'],
    href: '#',
    note: 'Internal government tool',
  },
  {
    index: '02',
    name: 'AI Lead-Gen Agent',
    category: 'Agentic AI',
    tech: ['Python', 'MCP', 'Agentic AI', 'Automation'],
    href: 'https://github.com/SaanviTondak/MCP-leads-agent',
  },
  {
    index: '03',
    name: 'Project Bambubuyog',
    category: 'Social Venture',
    tech: ['Marketplace', 'Data Tracking', 'Logistics'],
    href: 'https://www.projectbamboobuyog.com/',
  },
  {
    index: '04',
    name: 'Innovation Asia Lab',
    category: 'Full-Stack Web',
    tech: ['HTML/CSS', 'JavaScript', 'Full-Stack'],
    href: 'https://innovationasialab.com/',
  },
  {
    index: '05',
    name: 'GIC Transactions Dashboard',
    category: 'Data Science',
    tech: ['Python', 'Streamlit', 'Plotly', 'scikit-learn'],
    href: 'https://github.com/SaanviTondak/gic-dashboard',
  },
  {
    index: '06',
    name: 'Internship Review Platform',
    category: 'Full-Stack AI',
    tech: ['Vue.js', 'JavaScript', 'NLP', 'Sentiment'],
    href: 'https://github.com/SaanviTondak/LaunchPad---Internship-Recruitment-Platform-',
  },
];

// ---- Tech stack ------------------------------------------------------------
// `icon` maps to a key in components/icons/TechIcon.jsx; anything without a
// bespoke glyph falls back to a clean lettered badge.
export const techStack = [
  { label: 'Python', icon: 'python' },
  { label: 'SQL', icon: 'sql' },
  { label: 'R', icon: 'r' },
  { label: 'JavaScript', icon: 'javascript' },
  { label: 'Pandas', icon: 'pandas' },
  { label: 'NumPy', icon: 'numpy' },
  { label: 'scikit-learn', icon: 'scikit' },
  { label: 'RAG / LLM', icon: 'rag' },
  { label: 'Databricks', icon: 'databricks' },
  { label: 'Tableau', icon: 'tableau' },
  { label: 'Streamlit', icon: 'streamlit' },
  { label: 'Git', icon: 'git' },
];
