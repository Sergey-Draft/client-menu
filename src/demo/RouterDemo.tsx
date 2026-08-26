import { useState } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Menu as MenuIcon } from "lucide-react";
import { RouterSidebar } from "./RouterSidebar";
import { findNavLabel, getRoutableIds, navigationForRole, type Role } from "./navigation";

function PageContent({ id }: { id: string }) {
  return <h1 className="text-xl font-semibold text-gray-900">{findNavLabel(id)}</h1>;
}

function RouterLayout({ role, onRoleChange }: { role: Role; onRoleChange: (role: Role) => void }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const entries = navigationForRole(role);
  const routableIds = getRoutableIds(entries);

  return (
    <div className="min-h-screen bg-gray-50">
      <RouterSidebar
        entries={entries}
        activeId={location.pathname}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        mobileOpen={mobileOpen}
        onMobileOpenChange={setMobileOpen}
      />

      <div className={collapsed ? "md:pl-16" : "md:pl-64"}>
        <header className="flex h-14 items-center gap-3 border-b border-gray-200 bg-white px-4">
          <button
            type="button"
            aria-label="Открыть меню"
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          >
            <MenuIcon size={20} />
          </button>
          <span className="font-semibold text-gray-900 md:hidden">HelloClient</span>

          <label className="ml-auto flex items-center gap-2 text-sm text-gray-600">
            Роль (демо)
            <select
              value={role}
              onChange={(event) => onRoleChange(event.target.value as Role)}
              className="rounded-md border border-gray-300 px-2 py-1"
            >
              <option value="admin">admin</option>
              <option value="manager">manager</option>
            </select>
          </label>
        </header>

        <main className="p-6">
          <Routes>
            {routableIds.map((id) => (
              <Route key={id} path={id} element={<PageContent id={id} />} />
            ))}
            <Route path="/" element={<Navigate to="/payments" replace />} />
            <Route path="*" element={<Navigate to="/payments" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export function RouterDemo() {
  const [role, setRole] = useState<Role>("admin");

  return (
    <HashRouter>
      <RouterLayout role={role} onRoleChange={setRole} />
    </HashRouter>
  );
}
