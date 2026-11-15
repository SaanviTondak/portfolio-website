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
  roles: ['Applied AI', 'Machine Learning', 'Data Science'],
  email: 'saanvitondak@u.nus.edu',
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

// ---- About me --------------------------------------------------------------
export const about = {
  paragraphs: [
    "I'm a Business Analytics (Computing) student at NUS College, specialising in machine-learning analytics with a second major in quantitative finance. I love experimenting with new AI tools and turning them into applied projects that actually work, and I'm working towards a career in applied AI, machine learning and data science.",
    "So far I've had the chance to build a multi-agent RAG system at GovTech Singapore, which cut audit-question drafting time by about 85%. In my own time I keep tinkering: agentic RAG assistants, fraud-detection and learning-to-rank models, and an ML research agent that runs its own experiments.",
  ],
};

// ---- What I do -------------------------------------------------------------
export const whatIDo = [
  {
    title: 'AI & LLM Systems',
    subtitle: 'Where most of my recent projects live',
    description:
      "I've been building retrieval-augmented assistants and tool-calling agents, learning hybrid search, reranking and LLM-as-a-judge evaluation along the way.",
    tools: ['RAG', 'LLM agents', 'Hybrid search', 'Gemini API', 'FastAPI', 'MongoDB'],
  },
  {
    title: 'Machine Learning',
    subtitle: 'Learning to build models that hold up',
    description:
      'Fraud detection, learning-to-rank and segmentation projects, where I practise leakage-proof validation, hyperparameter tuning and explaining models with SHAP.',
    tools: ['Python', 'scikit-learn', 'XGBoost', 'CatBoost', 'LightGBM', 'SHAP', 'Optuna'],
  },
  {
    title: 'Data Engineering',
    subtitle: 'Turning data into decisions',
    description:
      'From internships: ETL pipelines, Databricks apps and containerised services, through to the dashboards teams use to make decisions.',
    tools: ['SQL', 'Spark SQL', 'Databricks', 'Docker', 'GitLab CI/CD', 'Tableau', 'Power BI'],
  },
];

// ---- Career / experience timeline ------------------------------------------
export const timeline = [
  {
    year: '2026',
    role: 'Data Scientist Intern',
    sub: 'GovTech Singapore',
    description:
      'Built a RAG system and multi-agent QA assistant that drafts IT-security audit questions grounded in IM8 policy across 12+ audit domains, cutting drafting time ~85% (about 65 man-days a year). Shipped with Docker, GitLab CI/CD and MongoDB, alongside 5+ Databricks apps and Spark SQL pipelines.',
  },
  {
    year: '2025',
    role: 'Business Analyst Intern',
    sub: 'Ernst & Young (EY)',
    description:
      "Automated Python–SQL pipelines consolidating 1M+ customer records and built 5 Tableau dashboards for a national gaming operator's Dynamics 365 CRM rollout, cutting reporting time 15%.",
  },
  {
    year: '2025',
    role: 'Associate Consultant',
    sub: 'Yale-NUS Consulting Group',
    description:
      'Built Python clustering models that identified 3 high-potential consumer segments across 6 Southeast Asian markets, feeding a market-entry plan for a plant-based beverage brand.',
  },
  {
    year: '2024',
    role: 'Co-founder',
    sub: 'Bambubuyog',
    description:
      'Social enterprise building a digital marketplace for stingless-bee honey with 50+ rural farmers in Palawan.',
  },
  {
    year: '2023',
    role: 'B.Sc. Business Analytics (Computing), Hons.',
    sub: 'NUS College, National University of Singapore',
    description:
      'Specialising in machine-learning analytics, with a second major in quantitative finance. Lim Hong Chin Memorial Scholarship recipient; exchange semester at UC Santa Barbara in 2025.',
  },
];

// ---- Work / projects -------------------------------------------------------
export const projects = [
  {
    index: '01',
    name: 'Agentic RAG Research Assistant',
    art: 'rag',
    category: 'LLM Agents',
    summary:
      'Tool-calling agent that routes questions across a SQL database and SEC 10-K filings: 100% accuracy on a held-out test set vs 72% for a fixed RAG pipeline. Hybrid search lifted recall@6 from 0.62 to 0.97.',
    tech: ['Python', 'FastAPI', 'SQL', 'BM25', 'Qwen3 embeddings'],
    href: 'https://github.com/SaanviTondak/RAG_agent',
  },
  {
    index: '02',
    name: 'AI Fraud Detection Engine',
    art: 'fraud',
    category: 'Machine Learning',
    summary:
      'Capstone with MSIG Insurance on 68K+ claims. A tuned CatBoost ensemble caught 17 of 61 confirmed frauds by flagging just 46 claims, explained with SHAP and LLM-written rationales.',
    tech: ['Python', 'CatBoost', 'SHAP', 'Optuna', 'Power BI'],
    href: '#',
    note: 'Capstone · MSIG Insurance',
  },
  {
    index: '03',
    name: 'Personalised Search Re-ranking',
    art: 'rank',
    category: 'Learning to Rank',
    summary:
      'LightGBM LambdaRank on 170K+ JD.com users with 65 engineered features: 0.415 NDCG@10, about 1.8× the best published JDSearch results, validated with bootstrap CIs and significance tests.',
    tech: ['Python', 'LightGBM', 'pandas'],
    href: '#',
    note: 'Research project',
  },
  {
    index: '04',
    name: 'Autonomous ML Research Agent',
    art: 'agent',
    category: 'AI Agents',
    summary:
      'An agent that writes, debugs and evaluates its own training code: 34 unattended experiments on 1.1M+ records, beating the official benchmark with zero GPU hours.',
    tech: ['Python', 'NumPy', 'Gemini API'],
    href: 'https://github.com/SaanviTondak/ml-research-agent',
  },
  {
    index: '05',
    name: 'AI Audit RAG System',
    art: 'audit',
    category: 'RAG / Multi-Agent',
    summary:
      'Built at GovTech: drafts IT-security audit questions grounded in IM8 policy across 12+ domains, with ~85% faster drafting and fully traceable reasoning.',
    tech: ['Python', 'RAG', 'MongoDB', 'Docker'],
    href: '#',
    note: 'Internal government tool',
  },
  {
    index: '06',
    name: 'Transactions Anomaly Dashboard',
    art: 'anomaly',
    category: 'Data Science',
    summary:
      'Streamlit and Plotly dashboard over 10K+ financial transactions, flagging anomalies with IQR rules and Isolation Forest.',
    tech: ['Python', 'Streamlit', 'Plotly', 'scikit-learn'],
    href: 'https://github.com/SaanviTondak/gic-dashboard',
  },
];

// ---- Tech stack ------------------------------------------------------------
// `icon` maps to a key in components/icons/TechIcon.jsx; anything without a
// bespoke glyph falls back to a clean lettered badge.
export const techStack = [
  { label: 'Python', icon: 'python' },
  { label: 'SQL', icon: 'sql' },
  { label: 'pandas', icon: 'pandas' },
  { label: 'scikit-learn', icon: 'scikit' },
  { label: 'XGBoost', icon: 'xgboost' },
  { label: 'RAG / LLM agents', icon: 'rag' },
  { label: 'Gemini API', icon: 'gemini' },
  { label: 'Spark SQL', icon: 'spark' },
  { label: 'Databricks', icon: 'databricks' },
  { label: 'MongoDB', icon: 'mongodb' },
  { label: 'FastAPI', icon: 'fastapi' },
  { label: 'Docker', icon: 'docker' },
  { label: 'Tableau', icon: 'tableau' },
  { label: 'Power BI', icon: 'powerbi' },
];
