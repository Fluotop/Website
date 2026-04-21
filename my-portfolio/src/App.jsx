import HeroPanel from "./components/HeroPanel/HeroPanel";
import TerminalIntro from "./components/TerminalIntro/TerminalIntro";
import ClickTrail from "./components/ClickTrail/ClickTrail";

import { useState } from "react";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  return (
    <main>
      {/* define function and pass it to terminalintro which calls it */}
      <ClickTrail />
      {!introComplete && (
        <TerminalIntro onComplete={() => setIntroComplete(true)} />
      )}
      {introComplete && <HeroPanel />}
    </main>
  );
}
