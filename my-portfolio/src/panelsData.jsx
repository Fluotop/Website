import HeroPanel from "./components/Panel/HeroPanel/HeroPanel";
import AboutPanel from "./components/Panel/AboutPanel/AboutPanel";
import SkillsPanel from "./components/Panel/SkillsPanel/SkillsPanel";
import WorkPanel from "./components/Panel/WorkPanel/WorkPanel";
import ProjectsPanel from "./components/Panel/ProjectsPanel/ProjectsPanel";
import ContactPanel from "./components/Panel/ContactPanel/ContactPanel";

export const panels = [
  { id: "hero", nav: false, panel: true, Component: HeroPanel },
  { id: "about", nav: true, panel: true, Component: AboutPanel },
  { id: "skills", nav: true, panel: true, Component: SkillsPanel },
  { id: "work", nav: true, panel: true, Component: WorkPanel },
  { id: "projects", nav: true, panel: true, Component: ProjectsPanel },
  { id: "contact", nav: true, panel: true, Component: ContactPanel },
  { id: "resume", nav: true, panel: false, href: "/resume.pdf" },
];
