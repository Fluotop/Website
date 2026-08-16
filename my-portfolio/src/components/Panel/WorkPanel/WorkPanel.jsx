import PanelShell from "../PanelShell";
import "./WorkPanel.css";

const START_YEAR = 2022;
const END_YEAR = new Date().getFullYear();

const jobs = [
  {
    id: "Medpace",
    company: "Medpace",
    role: "Data Standard Analyst",
    startDate: { START_YEAR },
    endDate: "2025",
    description:
      "Built websites and small data tools for local businesses. First taste of shipping things end-to-end.",
  },
  {
    id: "Career Break",
    company: "Career Break",
    role: "",
    startDate: "2025",
    endDate: { END_YEAR },
    description:
      "Career break in Mexico focused on Spanish language immersion, Data Engineering upskilling, and development of personal cloud-based projects (AWS, GCP). Delivered independent projects.",
  },
];

const INNER_PADDING = 25;

function asYear(value) {
  if (value && typeof value === "object")
    return String(Object.values(value)[0] ?? "");
  return value != null ? String(value) : "";
}

export default function WorkPanel() {
  const span = 100 - INNER_PADDING * 2;

  return (
    <PanelShell name="WORK">
      <div className="work-layout">
        <p className="work-intro">
          I had the opportunity to work for one of the biggest companies in
          clinical trials. Allowing me to work in multiple biometrics
          deparments. I was able to improve the efficiency of cross deparmental
          processes and realized how valueable data is for a company.
        </p>

        <div className="timeline">
          <span className="timeline-year">{START_YEAR}</span>

          <div className="timeline-track">
            <div className="timeline-line" />
            {jobs.map((job, i) => {
              const pos = INNER_PADDING + (i / (jobs.length - 1)) * span;
              return (
                <div
                  key={job.id}
                  className="timeline-marker"
                  style={{
                    left: `${pos}%`,
                    animationDelay: `${i * 120}ms`,
                  }}
                >
                  <span className="timeline-dot" />
                  <span className="timeline-label">{job.company}</span>

                  <div className="timeline-popup" role="tooltip">
                    {job.role && (
                      <span className="timeline-popup-role">{job.role}</span>
                    )}
                    <span className="timeline-popup-dates">
                      {asYear(job.startDate)} — {asYear(job.endDate)}
                    </span>
                    <p className="timeline-popup-description">
                      {job.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <span className="timeline-year">{END_YEAR}</span>
        </div>
      </div>
    </PanelShell>
  );
}
