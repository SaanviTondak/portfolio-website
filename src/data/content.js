/* =========================================================================
   SITE CONTENT
   Single source of truth for all editable copy, links and lists.
   Placeholders are wrapped in [SQUARE BRACKETS] — search for "[" to find
   everything that still needs your real details / assets.
   ========================================================================= */

// ---- Personal / identity ---------------------------------------------------
export const profile = {
  name: 'Saanvi Tondak',
  firstName: 'Saanvi',
  lastName: 'Tondak',
  monogram: 'ST',
  roles: ['Data Scientist', 'AI Engineer'],
  email: 'saanvitondak2004@gmail.com',
  location: 'Singapore',
  // Drop your resume PDF at /public/resume.pdf (see README).
  resumeUrl: '/resume.pdf',
};

// ---- Social links ----------------------------------------------------------
// TODO: replace the "#" hrefs with your real profile URLs.
export const socials = [
  { label: 'GitHub', href: '#', icon: 'github' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'X / Twitter', href: '#', icon: 'twitter' },
  { label: 'Instagram', href: '#', icon: 'instagram' },
];

// Footer social list (includes Facebook per the footer spec).
export const footerSocials = [
  { label: 'Github', href: '#' },
  { label: 'Linkedin', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
];

// ---- Navigation ------------------------------------------------------------
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

// ---- About / experience timeline ------------------------------------------
// Placeholder entries — edit role, sub-label and description freely.
export const timeline = [
  {
    year: 'NOW',
    role: '[ROLE]',
    sub: '[Freelance & Projects]',
    description:
      '[Describe what you are currently working on — the kind of problems you solve, the tools you reach for, and the impact you aim for.]',
  },
  {
    year: '2025',
    role: '[ROLE]',
    sub: '[Freelance & Projects]',
    description:
      '[Short description of this role or project and the outcomes you delivered.]',
  },
  {
    year: '2024',
    role: '[ROLE]',
    sub: '[Freelance & Projects]',
    description:
      '[Short description of this role or project and the outcomes you delivered.]',
  },
  {
    year: '2023',
    role: '[ROLE]',
    sub: '[Freelance & Projects]',
    description:
      '[Short description of this role or project and the outcomes you delivered.]',
  },
  {
    year: '2022',
    role: '[ROLE]',
    sub: '[Freelance & Projects]',
    description:
      '[Short description of this role or project and the outcomes you delivered.]',
  },
  {
    year: '2021',
    role: '[ROLE]',
    sub: '[Freelance & Projects]',
    description:
      '[Short description of this role or project and the outcomes you delivered.]',
  },
];

// ---- Work / projects -------------------------------------------------------
// Drop preview images at /public/projects/ and update the `image` paths.
export const projects = [
  {
    index: '01',
    name: '[PROJECT NAME]',
    category: 'AI / LLM',
    tech: ['Python', 'LangChain', 'FastAPI', 'React'],
    image: '/projects/project-1.jpg',
    href: '#',
  },
  {
    index: '02',
    name: '[PROJECT NAME]',
    category: 'Data Science',
    tech: ['Python', 'Pandas', 'scikit-learn', 'Plotly'],
    image: '/projects/project-2.jpg',
    href: '#',
  },
  {
    index: '03',
    name: '[PROJECT NAME]',
    category: 'Machine Learning',
    tech: ['PyTorch', 'NumPy', 'Docker', 'AWS'],
    image: '/projects/project-3.jpg',
    href: '#',
  },
  {
    index: '04',
    name: '[PROJECT NAME]',
    category: 'Full-Stack AI',
    tech: ['Next.js', 'Node.js', 'OpenAI', 'Postgres'],
    image: '/projects/project-4.jpg',
    href: '#',
  },
  {
    index: '05',
    name: '[PROJECT NAME]',
    category: 'Data Engineering',
    tech: ['Airflow', 'Spark', 'BigQuery', 'dbt'],
    image: '/projects/project-5.jpg',
    href: '#',
  },
];

// ---- Tech stack ------------------------------------------------------------
// `icon` maps to a key in components/icons/TechIcon.jsx. Edit freely.
export const techStack = [
  { label: 'Python', icon: 'python' },
  { label: 'JavaScript', icon: 'javascript' },
  { label: 'TypeScript', icon: 'typescript' },
  { label: 'React', icon: 'react' },
  { label: 'Next.js', icon: 'nextjs' },
  { label: 'Node.js', icon: 'nodejs' },
  { label: 'PyTorch', icon: 'pytorch' },
  { label: 'TensorFlow', icon: 'tensorflow' },
  { label: 'Docker', icon: 'docker' },
  { label: 'AWS', icon: 'aws' },
  { label: 'PostgreSQL', icon: 'postgresql' },
  { label: 'Git', icon: 'git' },
];
