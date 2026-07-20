import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Sparkles,
  Briefcase,
  FolderKanban,
  Award,
  Trophy,
  Mail,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/utils";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/hero", label: "Hero", icon: Sparkles },
  { to: "/about", label: "About", icon: User },
  { to: "/skills", label: "Skills", icon: Sparkles },
  { to: "/experience", label: "Experience", icon: Briefcase },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/certifications", label: "Certifications", icon: Award },
  { to: "/achievements", label: "Achievements", icon: Trophy },
  { to: "/contact", label: "Contact Info", icon: Mail },
  { to: "/messages", label: "Messages", icon: MessageSquare },
];

export function Sidebar() {
  const { admin, logout } = useAuth();

  return (
    <aside className="hidden md:flex h-screen w-64 shrink-0 flex-col border-r border-border bg-card/50 sticky top-0">
      <div className="p-5 border-b border-border">
        <h1 className="text-lg font-bold">Portfolio Admin</h1>
        <p className="text-xs text-muted-foreground mt-0.5">{admin?.name}</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-destructive"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}
