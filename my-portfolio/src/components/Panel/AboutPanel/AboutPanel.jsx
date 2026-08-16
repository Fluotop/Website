import PanelShell from "../PanelShell";
import TwoColumns from "../TwoColumns";

export default function AboutPanel() {
  return (
    <PanelShell name="ABOUT">
      <TwoColumns
        left={
          <>
            I'm a naturally curious person who tends to get a little too
            invested in whatever I'm interested in at the moment. Outside of
            tech, that usually means learning Spanish, travelling, running,
            going to the gym, or starting some random project just because I
            want to see if I can make it work.
          </>
        }
        right={
          <>
            I started my career working with biological data, studying Biology
            and Bioinformatics before moving into clinical research. Working
            with increasingly complex data eventually pulled me deeper into
            programming and software engineering.
            <br />
            <br />
            These days, I'm particularly interested in cloud infrastructure,
            DevOps, and data engineering. I enjoy understanding how things work
            underneath the surface and building systems myself rather than
            simply using them. This makes cross-departmental work something I
            thrive in.
            <br />
            <br />
            I'm a big believer in learning by doing. Most of what I know outside
            of my formal education has come from building projects, breaking
            things, and fixing them.
          </>
        }
      />
    </PanelShell>
  );
}
