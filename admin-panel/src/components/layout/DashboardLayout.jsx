import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { useAuth } from "../../context/AuthContext";

export function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      {/* Mobile topbar */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-base font-bold">Portfolio Admin</h1>
          <button onClick={() => setMobileOpen(true)} className="p-1">
            <Menu size={22} />
          </button>
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
            <div className="relative w-64 h-full bg-card p-4">
              <button onClick={() => setMobileOpen(false)} className="mb-4">
                <X size={20} />
              </button>
              <nav className="space-y-1">
                {[
                  ["/", "Dashboard"],
                  ["/hero", "Hero"],
                  ["/about", "About"],
                  ["/skills", "Skills"],
                  ["/experience", "Experience"],
                  ["/projects", "Projects"],
                  ["/certifications", "Certifications"],
                  ["/achievements", "Achievements"],
                  ["/contact", "Contact Info"],
                  ["/messages", "Messages"],
                ].map(([to, label]) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === "/"}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary"
                  >
                    {label}
                  </NavLink>
                ))}
                <button
                  onClick={logout}
                  className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-secondary"
                >
                  Logout
                </button>
              </nav>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 md:p-8 max-w-5xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
