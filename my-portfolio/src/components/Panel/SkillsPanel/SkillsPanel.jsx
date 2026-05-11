import PanelShell from "../PanelShell";
import "./SkillsPanel.css";

const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const skills = [
  {
    title: "Cloud & Infra",
    items: [
      {
        name: "AWS",
        icon: `${ICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
      },
      {
        name: "GCP",
        icon: `${ICON_BASE}/googlecloud/googlecloud-original.svg`,
      },
      { name: "FinOps", icon: `${ICON_BASE}/grafana/grafana-original.svg` },
      {
        name: "Terraform",
        icon: `${ICON_BASE}/terraform/terraform-original.svg`,
      },
      { name: "Docker", icon: `${ICON_BASE}/docker/docker-original.svg` },
    ],
  },
  {
    title: "Pipelines",
    items: [
      { name: "SQL", icon: `${ICON_BASE}/postgresql/postgresql-original.svg` },
      {
        name: "Data Modeling",
        icon: `${ICON_BASE}/databricks/databricks-original.svg`,
      },
      {
        name: "ETL / ELT",
        icon: `${ICON_BASE}/apacheairflow/apacheairflow-original.svg`,
      },
      {
        name: "Airflow",
        icon: `${ICON_BASE}/apacheairflow/apacheairflow-original.svg`,
      },
      {
        name: "Data Quality",
        icon: `${ICON_BASE}/grafana/grafana-original.svg`,
      },
    ],
  },
];

const certificates = [
  { name: "Certificate Placeholder 1" },
  { name: "Certificate Placeholder 2" },
];

export default function SkillsPanel() {
  return (
    <PanelShell name="SKILLS">
      <div className="skills-layout">
        <p className="skills-blurb">
          I excel in dissecting complex problems into manageable tasks,
          essential for crafting robust, maintainable code in large-scale
          projects. I'm driven by challenges, always seeking opportunities to
          enhance my skills. My self-directed learning approach empowers me to
          quickly grasp and adapt to new technologies autonomously.
        </p>
        <div className="skills-grid">
          {skills.map((column) => (
            <div key={column.title} className="skills-column">
              <h3 className="skills-column-title">{column.title}</h3>
              <ul className="skills-list">
                {column.items.map((skill) => (
                  <li key={skill.name} className="skill-item">
                    <img src={skill.icon} alt="" className="skill-icon" />
                    <span className="skill-name">{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="skills-column certificates-column">
            <h3 className="skills-column-title">Certificates</h3>
            <ul className="certificates-list">
              {certificates.map((cert) => (
                <li key={cert.name} className="certificate-item">
                  <div className="certificate-placeholder">
                    <span className="certificate-name">{cert.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}
