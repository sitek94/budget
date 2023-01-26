import { Outlet } from "@remix-run/react";

export default function ExpensesLayout() {
  return (
    <div className="prose p-4">
      <Outlet />
    </div>
  );
}
