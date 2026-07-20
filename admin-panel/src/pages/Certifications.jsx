import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { certificationsApi } from "../lib/endpoints";
import { PageHeader } from "../components/PageHeader";
import { Button, Input, Label, Card, CardContent, Spinner } from "../components/ui/primitives";
import { Modal, ConfirmDialog } from "../components/ui/Modal";
import { ImageUpload } from "../components/ui/ImageUpload";

const empty = { title: "", issuer: "", date: "", image: "", credentialUrl: "", order: 0 };

export default function Certifications() {
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
      const res = await certificationsApi.list();
      setItems(res.data.data);
    } catch {
      toast.error("Failed to load certifications");
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
        await certificationsApi.update(editing._id, form);
        toast.success("Certification updated");
      } else {
        await certificationsApi.create(form);
        toast.success("Certification added");
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
      await certificationsApi.remove(deleteTarget._id);
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
        title="Certifications"
        description="Certificates and badges you've earned."
        action={
          <Button onClick={openAdd}>
            <Plus size={16} /> Add Certification
          </Button>
        }
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner className="h-8 w-8 text-primary" />
        </div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10 text-muted-foreground">No certifications added yet.</CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <Card key={item._id}>
                {item.image && <img src={item.image} alt={item.title} className="h-32 w-full rounded-t-xl object-cover" />}
                <CardContent>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-primary">{item.issuer}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                  <div className="flex gap-1 mt-3">
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Certification" : "Add Certification"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="MongoDB Developer Certification" />
          </div>
          <div>
            <Label>Issuer</Label>
            <Input value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} required placeholder="MongoDB University" />
          </div>
          <div>
            <Label>Date</Label>
            <Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required placeholder="March 2025" />
          </div>
          <ImageUpload label="Certificate Image / Badge" value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
          <div>
            <Label>Credential Verify URL (optional)</Label>
            <Input value={form.credentialUrl} onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })} />
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
        title="Delete this certification?"
        description={`"${deleteTarget?.title}" will be removed.`}
      />
    </div>
  );
}
