import { useState } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { StateInspector } from "./StateInspector";
import { findNavLabel } from "./navigation";

export function StateDemo() {
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

      <div className={["sm:pb-16 lg:pb-0", collapsed ? "lg:pl-16" : "lg:pl-64"].join(" ")}>
        <header className="flex h-14 items-center gap-3 border-b border-gray-200 bg-white px-4 sm:hidden">
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
          <h1 className="text-xl font-semibold text-gray-900">{findNavLabel(activeId)}</h1>
          <StateInspector state={{ activeId, collapsed, mobileOpen }} />
        </main>
      </div>
    </div>
  );
}
