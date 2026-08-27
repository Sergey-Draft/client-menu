import { useState } from "react";
import { RouterDemo } from "./demo/RouterDemo";
import { StateDemo } from "./demo/StateDemo";

type Mode = "router" | "state";

const tabBase = "rounded-md px-3 py-1.5 text-sm font-medium";
const tabActive = "bg-white text-gray-900 shadow-sm";
const tabInactive = "text-gray-600 hover:text-gray-900";

function App() {
  const [mode, setMode] = useState<Mode>("router");

  return (
    <div>
      <div className="fixed bottom-20 right-3 z-60 flex gap-1 rounded-lg bg-gray-100 p-1 shadow-md">
        <button
          type="button"
          onClick={() => setMode("router")}
          className={[tabBase, mode === "router" ? tabActive : tabInactive].join(" ")}
        >
          React Router
        </button>
        <button
          type="button"
          onClick={() => setMode("state")}
          className={[tabBase, mode === "state" ? tabActive : tabInactive].join(" ")}
        >
          useState
        </button>
      </div>

      {mode === "router" ? <RouterDemo /> : <StateDemo />}
    </div>
  );
}

export default App;
