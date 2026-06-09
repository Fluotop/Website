import PanelShell from "../PanelShell";
import "./ProjectsPanel.css";

const ICONS = {
  github:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  external: "https://api.iconify.design/mdi/open-in-new.svg?color=ffffff",
};

const projects = [
  {
    id: "project-1",
    title: "Project One",
    image: "https://placehold.co/800x450/1a1a1a/89ff69?text=Project+Preview",
    description: "description 1",
    tech: ["React", "Node.js", "PostgreSQL", "AWS"],
    impact:
      "Reduced data processing time by 60% through pipeline optimization and async batching.",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    id: "project-2",
    title: "Project Two",
    image: "https://placehold.co/800x450/1a1a1a/f2ff5b?text=Project+Preview",
    description: "description 2",
    tech: ["Python", "Airflow", "GCP", "Terraform"],
    impact:
      "Real-time event ingestion handling 10k events/sec with sub-second latency.",
    liveUrl: "#",
    repoUrl: "#",
  },
];

export default function ProjectsPanel() {
  return (
    <PanelShell name="PROJECTS">
      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.id} className="project-card">
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
        ))}
      </div>
    </PanelShell>
  );
}
