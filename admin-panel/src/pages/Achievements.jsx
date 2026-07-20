import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { achievementsApi } from "../lib/endpoints";
import { PageHeader } from "../components/PageHeader";
import { Button, Input, Label, Card, CardContent, Spinner } from "../components/ui/primitives";
import { Modal, ConfirmDialog } from "../components/ui/Modal";

const empty = { label: "", value: 0, suffix: "+", icon: "", order: 0 };

export default function Achievements() {
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
      const res = await achievementsApi.list();
      setItems(res.data.data);
    } catch {
      toast.error("Failed to load achievements");
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
        await achievementsApi.update(editing._id, form);
        toast.success("Achievement updated");
      } else {
        await achievementsApi.create(form);
        toast.success("Achievement added");
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
      await achievementsApi.remove(deleteTarget._id);
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
        title="Achievements"
        description="Numbers shown as animated counters, e.g. 'Projects: 20+'."
        action={
          <Button onClick={openAdd}>
            <Plus size={16} /> Add Achievement
          </Button>
        }
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner className="h-8 w-8 text-primary" />
        </div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10 text-muted-foreground">No achievements added yet.</CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {items
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <Card key={item._id}>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold text-primary">
                    {item.value}
                    {item.suffix}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
                  <div className="flex justify-center gap-1 mt-3">
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Achievement" : "Add Achievement"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Label>Label</Label>
            <Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required placeholder="Projects Completed" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Value</Label>
              <Input
                type="number"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label>Suffix</Label>
              <Input value={form.suffix} onChange={(e) => setForm({ ...form, suffix: e.target.value })} placeholder="+" />
            </div>
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
        title="Delete this achievement?"
        description={`"${deleteTarget?.label}" will be removed.`}
      />
    </div>
  );
}
