import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { skillsApi } from "../lib/endpoints";
import { PageHeader } from "../components/PageHeader";
import { Button, Input, Label, Select, Card, CardContent, Spinner, Badge } from "../components/ui/primitives";
import { Modal, ConfirmDialog } from "../components/ui/Modal";

const categories = ["Frontend", "Backend", "Database", "Mobile", "Tools", "Other"];
const emptySkill = { name: "", category: "Frontend", icon: "", proficiency: 80, order: 0 };

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptySkill);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await skillsApi.list();
      setSkills(res.data.data);
    } catch (err) {
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(emptySkill);
    setModalOpen(true);
  };

  const openEdit = (skill) => {
    setEditing(skill);
    setForm(skill);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await skillsApi.update(editing._id, form);
        toast.success("Skill updated");
      } else {
        await skillsApi.create(form);
        toast.success("Skill added");
      }
      setModalOpen(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save skill");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await skillsApi.remove(deleteTarget._id);
      toast.success("Skill deleted");
      setDeleteTarget(null);
      load();
    } catch (err) {
      toast.error("Failed to delete skill");
    }
  };

  const moveSkill = async (category, idx, direction) => {
    const group = skills.filter((s) => s.category === category).sort((a, b) => a.order - b.order);
    const swapIdx = idx + direction;
    if (swapIdx < 0 || swapIdx >= group.length) return;

    const a = group[idx];
    const b = group[swapIdx];
    const items = [
      { id: a._id, order: b.order },
      { id: b._id, order: a.order },
    ];
    try {
      await skillsApi.reorder(items);
      load();
    } catch (err) {
      toast.error("Failed to reorder");
    }
  };

  const grouped = categories
    .map((cat) => ({ cat, items: skills.filter((s) => s.category === cat).sort((a, b) => a.order - b.order) }))
    .filter((g) => g.items.length > 0);

  return (
    <div>
      <PageHeader
        title="Skills"
        description="Manage the skills shown in your portfolio, grouped by category."
        action={
          <Button onClick={openAdd}>
            <Plus size={16} /> Add Skill
          </Button>
        }
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner className="h-8 w-8 text-primary" />
        </div>
      ) : grouped.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10 text-muted-foreground">
            No skills added yet. Click "Add Skill" to get started.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {grouped.map(({ cat, items }) => (
            <Card key={cat}>
              <CardContent>
                <h3 className="font-semibold mb-3">{cat}</h3>
                <div className="space-y-2">
                  {items.map((skill, idx) => (
                    <div
                      key={skill._id}
                      className="flex items-center justify-between rounded-lg border border-border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Badge>{skill.proficiency}%</Badge>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveSkill(cat, idx, -1)}
                          disabled={idx === 0}
                          className="p-1.5 rounded-md hover:bg-secondary disabled:opacity-30"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          onClick={() => moveSkill(cat, idx, 1)}
                          disabled={idx === items.length - 1}
                          className="p-1.5 rounded-md hover:bg-secondary disabled:opacity-30"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button onClick={() => openEdit(skill)} className="p-1.5 rounded-md hover:bg-secondary">
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(skill)}
                          className="p-1.5 rounded-md hover:bg-secondary hover:text-destructive"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Skill" : "Add Skill"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Label>Skill Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="e.g. React" />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Icon (name/slug, e.g. "react")</Label>
            <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="react" />
          </div>
          <div>
            <Label>Proficiency ({form.proficiency}%)</Label>
            <input
              type="range"
              min="0"
              max="100"
              value={form.proficiency}
              onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>
          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? <Spinner className="h-4 w-4" /> : "Save"}
          </Button>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete this skill?"
        description={`"${deleteTarget?.name}" will be removed from your portfolio.`}
      />
    </div>
  );
}
