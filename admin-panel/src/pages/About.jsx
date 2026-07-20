import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";
import { aboutApi } from "../lib/endpoints";
import { PageHeader } from "../components/PageHeader";
import { Button, Input, Label, Textarea, Card, CardContent, Spinner } from "../components/ui/primitives";
import { TagInput } from "../components/ui/TagInput";

const empty = { bio: "", education: [], experienceSummary: "", technologies: [], careerGoals: "" };

export default function About() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    aboutApi
      .get()
      .then((res) => setForm({ ...empty, ...res.data.data }))
      .catch(() => toast.error("Failed to load about data"))
      .finally(() => setLoading(false));
  }, []);

  const addEducation = () => {
    setForm({
      ...form,
      education: [...form.education, { degree: "", institution: "", year: "", grade: "" }],
    });
  };

  const updateEducation = (idx, field, value) => {
    const updated = [...form.education];
    updated[idx] = { ...updated[idx], [field]: value };
    setForm({ ...form, education: updated });
  };

  const removeEducation = (idx) => {
    setForm({ ...form, education: form.education.filter((_, i) => i !== idx) });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await aboutApi.update(form);
      setForm(res.data.data);
      toast.success("About section updated");
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
      <PageHeader title="About Section" description="Tell visitors who you are, your background, and goals." />

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardContent className="space-y-4">
            <div>
              <Label>Bio (who you are)</Label>
              <Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={5} required />
            </div>
            <div>
              <Label>Experience Summary</Label>
              <Textarea
                value={form.experienceSummary}
                onChange={(e) => setForm({ ...form, experienceSummary: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label>Career Goals</Label>
              <Textarea
                value={form.careerGoals}
                onChange={(e) => setForm({ ...form, careerGoals: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label>Technologies you work with</Label>
              <TagInput
                value={form.technologies}
                onChange={(technologies) => setForm({ ...form, technologies })}
                placeholder="e.g. React, Node.js — press Enter"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Education</h3>
              <Button type="button" variant="outline" size="sm" onClick={addEducation}>
                <Plus size={14} /> Add
              </Button>
            </div>

            <div className="space-y-4">
              {form.education.length === 0 && (
                <p className="text-sm text-muted-foreground">No education entries yet.</p>
              )}
              {form.education.map((edu, idx) => (
                <div key={idx} className="rounded-lg border border-border p-4 relative space-y-3">
                  <button
                    type="button"
                    onClick={() => removeEducation(idx)}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Degree</Label>
                      <Input value={edu.degree} onChange={(e) => updateEducation(idx, "degree", e.target.value)} placeholder="BCA" />
                    </div>
                    <div>
                      <Label>Year</Label>
                      <Input value={edu.year} onChange={(e) => updateEducation(idx, "year", e.target.value)} placeholder="2022 - 2025" />
                    </div>
                  </div>
                  <div>
                    <Label>Institution</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(idx, "institution", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Grade (optional)</Label>
                    <Input value={edu.grade} onChange={(e) => updateEducation(idx, "grade", e.target.value)} placeholder="8.5 CGPA" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={saving}>
          {saving ? <Spinner className="h-4 w-4" /> : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
