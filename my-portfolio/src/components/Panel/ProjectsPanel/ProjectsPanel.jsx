import { useState } from "react";
import PanelShell from "../PanelShell";
import "./ProjectsPanel.css";
import Dashboard from "../../../assets/dashboard.png";
import Website from "../../../assets/website.png";
import Clock from "../../../assets/Clock.png";

const ICONS = {
  github:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  external: "https://api.iconify.design/mdi/open-in-new.svg?color=ffffff",
};

const projects = [
  {
    id: "project-1",
    title: "Supermarket Price Tracker",
    image: Dashboard,
    description:
      "Dashboard showing price trends and insights for mexican supermarket products.",
    tech: ["Python", "AWS", "Terraform", "Bash", "SQL", "CI/CD"],
    impact: "List the biggest price increases, decreases and best deals weekly",
    liveUrl: "https://www.bendemaesschalck.be/dashboard",
    repoUrl: "https://github.com/Fluotop/AWS-Scraper",
  },
  {
    id: "project-2",
    title: "Personal Website",
    image: Website,
    description:
      "A responsive personal CV and portfolio website, showcasing my skills, certifications, projects, and experience.",
    tech: ["Vue React", "CSS", "Python", "Terraform", "CI/CD", "AWS"],
    impact:
      "Built and deployed a production-ready portfolio using Infrastructure as Code, with automated deployment and AWS cloud infrastructure.",
    liveUrl: "#",
    repoUrl: "https://github.com/Fluotop/Website",
  },
  {
    id: "project-3",
    title: "Arduino clock",
    image: Clock,
    description:
      "A clock built with an Arduino, displaying time via step motors and 3D printed segments",
    tech: ["Arduino", "3D Printing", "C++", "KICAD", "Electronics"],
    impact:
      "Fully hand made clock, including shematics, PCB design, 3d printed parts and woodwork. The clock is fully functional and connects to time servers via an ESP-32 chip",
    liveUrl: "#",
    repoUrl: "https://github.com/Fluotop/ArduinoClock",
  },
];

const PROJECTS_PER_PAGE = 2;

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-top">
        <div className="project-media">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="project-image"
            loading="lazy"
          />
        </div>
        <ul className="project-tech">
          {project.tech.map((t) => (
            <li key={t} className="project-tech-tag">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <p className="project-impact">
          <span className="project-impact-marker">▸</span>
          {project.impact}
        </p>

        <div className="project-actions">
          <a
            href={project.liveUrl}
            className="project-button project-button-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={ICONS.external} alt="" className="project-icon" />
            <span>View Live</span>
          </a>
          <a
            href={project.repoUrl}
            className="project-button project-button-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={ICONS.github} alt="" className="project-icon" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPanel() {
  const [page, setPage] = useState(0);
  const totalPages = Math.max(
    1,
    Math.ceil(projects.length / PROJECTS_PER_PAGE),
  );
  const hasMultiplePages = totalPages > 1;

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <PanelShell name="PROJECTS">
      <div className="projects-carousel">
        {hasMultiplePages && (
          <button
            type="button"
            className="projects-arrow projects-arrow-left"
            onClick={goPrev}
            disabled={page === 0}
            aria-label="Previous projects"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        <div className="projects-viewport">
          <div
            className="projects-track"
            style={{
              width: `${totalPages * 100}%`,
              transform: `translateX(-${(100 / totalPages) * page}%)`,
            }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div
                className="projects-grid"
                key={pageIndex}
                style={{ width: `${100 / totalPages}%` }}
              >
                {projects
                  .slice(
                    pageIndex * PROJECTS_PER_PAGE,
                    pageIndex * PROJECTS_PER_PAGE + PROJECTS_PER_PAGE,
                  )
                  .map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
              </div>
            ))}
          </div>
        </div>

        {hasMultiplePages && (
          <button
            type="button"
            className="projects-arrow projects-arrow-right"
            onClick={goNext}
            disabled={page === totalPages - 1}
            aria-label="Next projects"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {hasMultiplePages && (
        <div className="projects-dots">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              type="button"
              key={i}
              className={`projects-dot${i === page ? " active" : ""}`}
              onClick={() => setPage(i)}
              aria-label={`Go to project page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </PanelShell>
  );
}
