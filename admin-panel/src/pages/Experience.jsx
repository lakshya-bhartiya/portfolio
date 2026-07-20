import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { experienceApi } from "../lib/endpoints";
import { PageHeader } from "../components/PageHeader";
import { Button, Input, Label, Card, CardContent, Spinner } from "../components/ui/primitives";
import { Modal, ConfirmDialog } from "../components/ui/Modal";
import { TagInput } from "../components/ui/TagInput";

const empty = {
  role: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  points: [],
  order: 0,
};

export default function Experience() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await experienceApi.list();
      setItems(res.data.data);
    } catch {
      toast.error("Failed to load experience");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...empty, order: items.length });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm(item);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await experienceApi.update(editing._id, form);
        toast.success("Experience updated");
      } else {
        await experienceApi.create(form);
        toast.success("Experience added");
      }
      setModalOpen(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await experienceApi.remove(deleteTarget._id);
      toast.success("Deleted");
      setDeleteTarget(null);
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <PageHeader
        title="Experience"
        description="Your work experience timeline."
        action={
          <Button onClick={openAdd}>
            <Plus size={16} /> Add Experience
          </Button>
        }
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner className="h-8 w-8 text-primary" />
        </div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10 text-muted-foreground">No experience entries yet.</CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {items
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <Card key={item._id}>
                <CardContent className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{item.role}</h3>
                    <p className="text-sm text-primary">{item.company}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.startDate} — {item.current ? "Present" : item.endDate}
                    </p>
                    <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground space-y-0.5">
                      {item.points.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded-md hover:bg-secondary">
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="p-1.5 rounded-md hover:bg-secondary hover:text-destructive"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Experience" : "Add Experience"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Label>Role</Label>
            <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required placeholder="Full Stack Developer Intern" />
          </div>
          <div>
            <Label>Company</Label>
            <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
          </div>
          <div>
            <Label>Location (optional)</Label>
            <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Start Date</Label>
              <Input value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required placeholder="Jan 2024" />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                placeholder="Jun 2024"
                disabled={form.current}
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.current}
              onChange={(e) => setForm({ ...form, current: e.target.checked, endDate: e.target.checked ? "" : form.endDate })}
            />
            This is my current role
          </label>
          <div>
            <Label>Bullet Points (responsibilities/achievements)</Label>
            <TagInput
              value={form.points}
              onChange={(points) => setForm({ ...form, points })}
              placeholder="e.g. Built REST APIs — press Enter"
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
        title="Delete this experience entry?"
        description={`"${deleteTarget?.role} at ${deleteTarget?.company}" will be removed.`}
      />
    </div>
  );
}
