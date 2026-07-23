import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { heroApi } from "../lib/endpoints";
import { PageHeader } from "../components/PageHeader";
import { Button, Input, Label, Textarea, Card, CardContent, Spinner } from "../components/ui/primitives";
import { ImageUpload } from "../components/ui/ImageUpload";
import { ResumeUpload } from "../components/ui/ResumeUpload";

const empty = {
  name: "",
  role: "",
  tagline: "",
  profileImage: "",
  resumeUrl: "",
  ctaButtons: { viewProjectsLabel: "View Projects", contactLabel: "Contact Me", resumeLabel: "Download Resume" },
  socialLinks: { github: "", linkedin: "", twitter: "", instagram: "" },
};

export default function Hero() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    heroApi
      .get()
      .then((res) => setForm({ ...empty, ...res.data.data }))
      .catch(() => toast.error("Failed to load hero data"))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await heroApi.update(form);
      setForm(res.data.data);
      toast.success("Hero section updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Hero Section" description="This is the first thing visitors see on your portfolio." />

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardContent className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <Label>Role / Title</Label>
              <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
            </div>
            <div>
              <Label>Tagline (2-3 line intro)</Label>
              <Textarea
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                required
                rows={4}
              />
            </div>
            <ImageUpload
              label="Profile Image"
              value={form.profileImage}
              onChange={(url) => setForm({ ...form, profileImage: url })}
            />
            <ResumeUpload
              value={form.resumeUrl}
              onChange={(url) => setForm({ ...form, resumeUrl: url })}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <h3 className="font-semibold">Social Links</h3>
            {["github", "linkedin", "twitter", "instagram"].map((key) => (
              <div key={key}>
                <Label className="capitalize">{key}</Label>
                <Input
                  value={form.socialLinks?.[key] || ""}
                  onChange={(e) =>
                    setForm({ ...form, socialLinks: { ...form.socialLinks, [key]: e.target.value } })
                  }
                  placeholder={`https://${key}.com/yourprofile`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <h3 className="font-semibold">CTA Button Labels</h3>
            {[
              ["viewProjectsLabel", "View Projects Button"],
              ["contactLabel", "Contact Button"],
              ["resumeLabel", "Resume Button"],
            ].map(([key, label]) => (
              <div key={key}>
                <Label>{label}</Label>
                <Input
                  value={form.ctaButtons?.[key] || ""}
                  onChange={(e) =>
                    setForm({ ...form, ctaButtons: { ...form.ctaButtons, [key]: e.target.value } })
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Button type="submit" disabled={saving}>
          {saving ? <Spinner className="h-4 w-4" /> : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
