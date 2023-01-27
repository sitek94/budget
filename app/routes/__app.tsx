import { NavLink, Outlet } from "@remix-run/react";

export default function AppLayout() {
  return (
    <>
      <nav className="p-4 flex gap-2 border-b border-gray-300">
        {[
          ["Budget", "budget"],
          ["Transactions", "expenses"],
          ["New Transaction", "expenses/new"],
        ].map(([label, to]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? "text-primary-500" : "text-gray-500"
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </>
  );
}
