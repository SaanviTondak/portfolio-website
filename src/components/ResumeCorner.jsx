import { profile } from '../data/content';
import './ResumeCorner.css';

/** Fixed RESUME label + icon, bottom-right. */
export default function ResumeCorner() {
  return (
    <a
      className="resume-corner"
      href={profile.resumeUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Open resume"
    >
      <span className="resume-corner__label">Resume</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M14 3h7v7M21 3l-9 9M5 7v12a2 2 0 0 0 2 2h12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
