/**
 * Small line illustrations for the project card headers. Each one sketches
 * what the project does (documents feeding an agent, outliers in a scatter,
 * a ranked list...) in the site's pink accent. Pure SVG, scales with the card.
 */

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
const SOFT = 'var(--accent-soft)';

// Agentic RAG: a stack of filings and a database feeding an agent, which answers.
function Rag() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${16 + i * 7} ${16 + i * 6})`} opacity={0.45 + i * 0.27}>
          <rect x="0" y="0" width="38" height="48" rx="4" {...S} fill={i === 2 ? SOFT : 'none'} />
          {i === 2 && [12, 20, 28, 36].map((y) => <line key={y} x1="8" y1={y} x2={y === 36 ? 22 : 30} y2={y} {...S} strokeWidth="1.3" />)}
        </g>
      ))}
      <g transform="translate(26 82)">
        <ellipse cx="14" cy="0" rx="14" ry="4.5" {...S} />
        <path d="M0 0v10c0 2.5 6.3 4.5 14 4.5S28 12.5 28 10V0" {...S} />
      </g>
      <path d="M72 42 C 96 42, 98 60, 118 60" {...S} strokeDasharray="3 4" />
      <path d="M58 88 C 92 88, 96 64, 118 62" {...S} strokeDasharray="3 4" />
      <circle cx="134" cy="60" r="16" {...S} fill={SOFT} />
      <path d="M134 50l2.6 6.4 6.4 2.6-6.4 2.6-2.6 6.4-2.6-6.4-6.4-2.6 6.4-2.6z" fill="currentColor" stroke="none" />
      <path d="M152 60 H 172" {...S} />
      <path d="M168 56l4 4-4 4" {...S} />
      <rect x="178" y="40" width="50" height="34" rx="9" {...S} />
      <path d="M190 74l-4 9 11-9" {...S} />
      <line x1="188" y1="52" x2="218" y2="52" {...S} strokeWidth="1.3" />
      <line x1="188" y1="61" x2="208" y2="61" {...S} strokeWidth="1.3" />
    </>
  );
}

// Fraud detection: a cloud of ordinary claims with a few circled outliers.
function Fraud() {
  const pts = [
    [36, 70], [44, 62], [50, 74], [58, 66], [62, 78], [70, 60], [74, 72], [82, 66], [88, 80], [94, 62],
    [100, 74], [106, 68], [112, 82], [118, 64], [124, 76], [130, 70], [138, 84], [56, 86], [80, 88], [104, 90],
    [66, 52], [92, 50], [120, 54], [146, 74], [150, 64], [42, 82], [128, 92], [76, 82], [110, 58], [140, 60],
  ];
  const flagged = [[176, 30], [196, 46], [212, 24]];
  return (
    <>
      <path d="M22 100 V 14 M22 100 H 232" {...S} opacity="0.4" />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.6" fill="currentColor" opacity="0.38" />)}
      <path d="M160 100 C 166 60, 180 36, 232 22" {...S} strokeDasharray="3 4" opacity="0.55" />
      {flagged.map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="9" {...S} fill={SOFT} />
          <circle cx={x} cy={y} r="3.2" fill="currentColor" />
        </g>
      ))}
    </>
  );
}

// Learning to rank: a list re-ordered, with the best match rising to the top.
function Rank() {
  const bars = [0.92, 0.74, 0.6, 0.46, 0.32];
  return (
    <>
      {bars.map((w, i) => (
        <g key={i} transform={`translate(0 ${16 + i * 17})`}>
          <text x="22" y="10" fontSize="10" fontWeight="700" fill="currentColor" opacity={i === 0 ? 1 : 0.5}>{i + 1}</text>
          <rect x="38" y="1" width={150 * w} height="11" rx="5.5" {...S} fill={i === 0 ? 'currentColor' : SOFT} opacity={i === 0 ? 0.9 : 0.75} />
        </g>
      ))}
      <path d="M210 88 V 24" {...S} />
      <path d="M203 31l7-8 7 8" {...S} />
    </>
  );
}

// Research agent: the write -> run -> evaluate -> fix loop.
function Agent() {
  const nodes = [
    [120, 22, 'code'],
    [176, 60, 'run'],
    [120, 98, 'eval'],
    [64, 60, 'fix'],
  ];
  return (
    <>
      <circle cx="120" cy="60" r="38" {...S} strokeDasharray="4 5" opacity="0.6" />
      <path d="M150 34l6 3-3 6" {...S} opacity="0.8" />
      <path d="M90 86l-6-3 3-6" {...S} opacity="0.8" />
      {nodes.map(([x, y, k]) => (
        <g key={k} transform={`translate(${x} ${y})`}>
          <circle r="13" {...S} fill={SOFT} />
          {k === 'code' && <path d="M-5 -4l-4 4 4 4M5 -4l4 4-4 4" {...S} strokeWidth="1.4" />}
          {k === 'run' && <path d="M-3.5 -5.5v11l9-5.5z" fill="currentColor" stroke="none" />}
          {k === 'eval' && <path d="M-6 4V0M-2 4V-4M2 4V-1M6 4V-6" {...S} strokeWidth="1.6" />}
          {k === 'fix' && <path d="M-5 0l3.5 3.5L6 -4" {...S} />}
        </g>
      ))}
      <path d="M120 49l2.2 5.5 5.5 2.2-5.5 2.2-2.2 5.5-2.2-5.5-5.5-2.2 5.5-2.2z" fill="currentColor" stroke="none" />
    </>
  );
}

// Audit RAG: a policy document checked off by a shield.
function Audit() {
  return (
    <>
      <rect x="66" y="16" width="62" height="80" rx="6" {...S} fill={SOFT} />
      {[32, 44, 56, 68].map((y, i) => (
        <g key={y}>
          <path d={`M76 ${y}l3 3 5-6`} {...S} strokeWidth="1.4" />
          <line x1="92" y1={y} x2={i % 2 ? 110 : 118} y2={y} {...S} strokeWidth="1.3" />
        </g>
      ))}
      <path d="M150 30l24-8 24 8v20c0 18-11 30-24 36-13-6-24-18-24-36z" {...S} fill={SOFT} />
      <path d="M163 54l8 8 15-17" {...S} strokeWidth="2" />
    </>
  );
}

// Anomaly dashboard: a time series with one spike crossing the threshold.
function Anomaly() {
  return (
    <>
      <path d="M22 100 V 14 M22 100 H 232" {...S} opacity="0.4" />
      <line x1="22" y1="40" x2="232" y2="40" {...S} strokeDasharray="4 5" opacity="0.55" />
      <path
        d="M24 80 L40 74 L54 82 L68 70 L82 76 L96 66 L110 74 L124 68 L136 24 L148 72 L162 64 L176 72 L190 62 L204 70 L218 60 L230 66"
        {...S}
      />
      <path d="M24 80 L40 74 L54 82 L68 70 L82 76 L96 66 L110 74 L124 68 L136 24 L148 72 L162 64 L176 72 L190 62 L204 70 L218 60 L230 66 L230 100 L24 100 Z" fill={SOFT} stroke="none" />
      <circle cx="136" cy="24" r="9" {...S} />
      <circle cx="136" cy="24" r="3" fill="currentColor" />
    </>
  );
}

const ART = { rag: Rag, fraud: Fraud, rank: Rank, agent: Agent, audit: Audit, anomaly: Anomaly };

export default function ProjectArt({ kind }) {
  const Art = ART[kind];
  if (!Art) return null;
  return (
    <svg className="project-art" viewBox="0 0 240 112" aria-hidden="true" focusable="false">
      <Art />
    </svg>
  );
}
