import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X, UploadCloud, Loader2, Star } from "lucide-react";
import { projectsApi, uploadFile } from "../lib/endpoints";
import { PageHeader } from "../components/PageHeader";
import { Button, Input, Label, Textarea, Card, CardContent, Spinner, Badge } from "../components/ui/primitives";
import { Modal, ConfirmDialog } from "../components/ui/Modal";
import { TagInput } from "../components/ui/TagInput";

const empty = {
  title: "",
  description: "",
  images: [],
  techStack: [],
  features: [],
  githubLink: "",
  liveLink: "",
  videoLink: "",
  caseStudyLink: "",
  featured: false,
  order: 0,
};

function MultiImageUpload({ images, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadFile(file);
      onChange([...images, res.data.data.url]);
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Label>Project Images (first one is the cover image)</Label>
      <div className="flex flex-wrap gap-3">
        {images.map((url, idx) => (
          <div key={idx} className="relative">
            <img src={url} alt="" className="h-20 w-20 rounded-lg object-cover border border-border" />
            {idx === 0 && (
              <span className="absolute -top-1 -left-1 bg-primary text-primary-foreground rounded-full p-0.5">
                <Star size={10} fill="currentColor" />
              </span>
            )}
            <button
              type="button"
              onClick={() => onChange(images.filter((_, i) => i !== idx))}
              className="absolute -top-1.5 -right-1.5 rounded-full bg-destructive p-0.5 text-destructive-foreground"
            >
              <X size={11} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => !uploading && inputRef.current?.click()}
          className="h-20 w-20 rounded-lg border border-dashed border-border flex items-center justify-center hover:bg-secondary/50"
        >
          {uploading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} className="text-muted-foreground" />}
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
    </div>
  );
}

export default function Projects() {
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
      const res = await projectsApi.list();
      setItems(res.data.data);
    } catch {
      toast.error("Failed to load projects");
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
        await projectsApi.update(editing._id, form);
        toast.success("Project updated");
      } else {
        await projectsApi.create(form);
        toast.success("Project added");
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
      await projectsApi.remove(deleteTarget._id);
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
        title="Projects"
        description="Showcase your work. Toggle 'Featured' to highlight on the homepage."
        action={
          <Button onClick={openAdd}>
            <Plus size={16} /> Add Project
          </Button>
        }
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner className="h-8 w-8 text-primary" />
        </div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10 text-muted-foreground">No projects added yet.</CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {items
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <Card key={item._id}>
                {item.images?.[0] && (
                  <img src={item.images[0]} alt={item.title} className="h-36 w-full rounded-t-xl object-cover" />
                )}
                <CardContent>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.featured && <Badge>Featured</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.techStack.slice(0, 4).map((t, i) => (
                      <Badge key={i} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-1 mt-4">
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Project" : "Add Project"} className="max-w-2xl">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="ElectroFix" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={3} />
          </div>

          <MultiImageUpload images={form.images} onChange={(images) => setForm({ ...form, images })} />

          <div>
            <Label>Tech Stack</Label>
            <TagInput value={form.techStack} onChange={(techStack) => setForm({ ...form, techStack })} placeholder="e.g. Next.js — press Enter" />
          </div>
          <div>
            <Label>Features</Label>
            <TagInput value={form.features} onChange={(features) => setForm({ ...form, features })} placeholder="e.g. OTP Login — press Enter" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>GitHub Link</Label>
              <Input value={form.githubLink} onChange={(e) => setForm({ ...form, githubLink: e.target.value })} placeholder="https://github.com/..." />
            </div>
            <div>
              <Label>Live Demo Link</Label>
              <Input value={form.liveLink} onChange={(e) => setForm({ ...form, liveLink: e.target.value })} placeholder="https://..." />
            </div>
            <div>
              <Label>Video Demo (optional)</Label>
              <Input value={form.videoLink} onChange={(e) => setForm({ ...form, videoLink: e.target.value })} />
            </div>
            <div>
              <Label>Case Study Link (optional)</Label>
              <Input value={form.caseStudyLink} onChange={(e) => setForm({ ...form, caseStudyLink: e.target.value })} />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Show in Featured Projects section
          </label>

          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? <Spinner className="h-4 w-4" /> : "Save"}
          </Button>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete this project?"
        description={`"${deleteTarget?.title}" will be removed from your portfolio.`}
      />
    </div>
  );
}
