import TerminalIntro from "./components/TerminalIntro/TerminalIntro";
import ClickTrail from "./components/ClickTrail/ClickTrail";
import CreatePanel from "./components/ContentPanel/ContentPanel";
import { useState } from "react";
import { panels } from "./panelsData";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  return (
    <main>
      <ClickTrail />
      {/* define function and pass it to terminalintro which calls it */}
      {!introComplete && (
        <TerminalIntro onComplete={() => setIntroComplete(true)} />
      )}
      {introComplete && (
        <>
          <Header />
          <Sidebar />
          <CreatePanel items={panels} />
        </>
      )}
    </main>
  );
}
