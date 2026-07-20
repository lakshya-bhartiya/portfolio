import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { contactApi } from "../lib/endpoints";
import { PageHeader } from "../components/PageHeader";
import { Button, Input, Label, Card, CardContent, Spinner } from "../components/ui/primitives";

const empty = { email: "", phone: "", location: "", linkedin: "", github: "", twitter: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    contactApi
      .get()
      .then((res) => setForm({ ...empty, ...res.data.data }))
      .catch(() => toast.error("Failed to load contact info"))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await contactApi.update(form);
      setForm(res.data.data);
      toast.success("Contact info updated");
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
      <PageHeader title="Contact Info" description="Shown in the Contact section of your portfolio." />

      <form onSubmit={handleSave} className="space-y-4">
        <Card>
          <CardContent className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <Label>Phone</Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <Label>Location</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Indore, India" />
            </div>
            <div>
              <Label>LinkedIn</Label>
              <Input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
            </div>
            <div>
              <Label>GitHub</Label>
              <Input value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
            </div>
            <div>
              <Label>Twitter / X</Label>
              <Input value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} />
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
