import { useState } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { Sidebar } from "./demo/Sidebar";
import { isNavGroup, navigation } from "./demo/navigation";

function findLabel(id: string | undefined): string {
  if (!id) return "";
  for (const entry of navigation) {
    if (entry.id === id) return entry.label;
    if (isNavGroup(entry)) {
      const child = entry.children.find((c) => c.id === id);
      if (child) return `${entry.label} / ${child.label}`;
    }
  }
  return id;
}

// Plain useState here, on purpose: this page is the "no router" half of the
// integration demo. Sidebar itself doesn't know or care.
function App() {
  const [activeId, setActiveId] = useState("/payments");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        activeId={activeId}
        onNavigate={setActiveId}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        mobileOpen={mobileOpen}
        onMobileOpenChange={setMobileOpen}
      />

      <div className={collapsed ? "md:pl-16" : "md:pl-64"}>
        <header className="flex h-14 items-center gap-3 border-b border-gray-200 bg-white px-4 md:hidden">
          <button
            type="button"
            aria-label="Открыть меню"
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
          >
            <MenuIcon size={20} />
          </button>
          <span className="font-semibold text-gray-900">HelloClient</span>
        </header>

        <main className="p-6">
          <h1 className="text-xl font-semibold text-gray-900">{findLabel(activeId)}</h1>
        </main>
      </div>
    </div>
  );
}

export default App;
