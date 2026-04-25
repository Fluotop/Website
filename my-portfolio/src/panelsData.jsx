import HeroPanel from "./components/HeroPanel/HeroPanel";

const Placeholder = ({ title }) => (
  <section className="panel">
    <h2>{title}</h2>
  </section>
);

export const panels = [
  { id: "hero", nav: false, panel: true, Component: HeroPanel },
  {
    id: "about",
    nav: true,
    panel: true,
    Component: () => <Placeholder title="about" />,
  },
  {
    id: "skills",
    nav: true,
    panel: true,
    Component: () => <Placeholder title="skills" />,
  },
  {
    id: "work",
    nav: true,
    panel: true,
    Component: () => <Placeholder title="work" />,
  },
  {
    id: "projects",
    nav: true,
    panel: true,
    Component: () => <Placeholder title="projects" />,
  },
  {
    id: "contact",
    nav: true,
    panel: true,
    Component: () => <Placeholder title="contact" />,
  },
  { id: "resume", nav: true, panel: false, href: "/resume.pdf" },
];
