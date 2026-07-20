import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Briefcase, FolderKanban, Award, Trophy, MessageSquare } from "lucide-react";
import {
  skillsApi,
  experienceApi,
  projectsApi,
  certificationsApi,
  achievementsApi,
  messagesApi,
} from "../lib/endpoints";
import { Card, CardContent } from "../components/ui/primitives";
import { PageHeader } from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";

const cards = [
  { key: "skills", label: "Skills", icon: Sparkles, to: "/skills", api: skillsApi },
  { key: "experience", label: "Experience", icon: Briefcase, to: "/experience", api: experienceApi },
  { key: "projects", label: "Projects", icon: FolderKanban, to: "/projects", api: projectsApi },
  { key: "certifications", label: "Certifications", icon: Award, to: "/certifications", api: certificationsApi },
  { key: "achievements", label: "Achievements", icon: Trophy, to: "/achievements", api: achievementsApi },
];

export default function Dashboard() {
  const { admin } = useAuth();
  const [counts, setCounts] = useState({});
  const [unreadMsgs, setUnreadMsgs] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const results = await Promise.all(cards.map((c) => c.api.list()));
        const newCounts = {};
        results.forEach((res, idx) => {
          newCounts[cards[idx].key] = res.data.count ?? res.data.data.length;
        });
        setCounts(newCounts);

        const msgRes = await messagesApi.list();
        setUnreadMsgs(msgRes.data.data.filter((m) => !m.read).length);
      } catch (err) {
        // silently ignore - individual pages will surface errors
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <PageHeader title={`Welcome back, ${admin?.name?.split(" ")[0] || ""}`} description="Here's a quick overview of your portfolio content." />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map(({ key, label, icon: Icon, to }) => (
          <Link key={key} to={to}>
            <Card className="hover:border-primary/50 transition-colors">
              <CardContent className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <Icon className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{loading ? "–" : counts[key] ?? 0}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        <Link to="/messages">
          <Card className="hover:border-primary/50 transition-colors">
            <CardContent className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                <MessageSquare className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold">{loading ? "–" : unreadMsgs}</p>
                <p className="text-sm text-muted-foreground">Unread Messages</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card className="mt-6">
        <CardContent>
          <h3 className="font-semibold mb-2">Quick tip</h3>
          <p className="text-sm text-muted-foreground">
            Any change you make here (adding a skill, publishing a new project, updating your bio) reflects
            on your live portfolio automatically — no code changes needed.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
