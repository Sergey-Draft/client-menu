export function StateInspector({ state }: { state: Record<string, unknown> }) {
  return (
    <details className="mt-4 inline-block rounded-lg border border-gray-200 bg-white text-xs text-gray-700">
      <summary className="cursor-pointer select-none px-3 py-2 font-medium text-gray-500">
        Состояние меню (activeId / collapsed / mobileOpen — контролируются извне)
      </summary>
      <pre className="border-t border-gray-100 px-3 py-2">{JSON.stringify(state, null, 2)}</pre>
    </details>
  );
}
