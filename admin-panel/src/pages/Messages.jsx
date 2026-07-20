import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2, Mail, MailOpen } from "lucide-react";
import { messagesApi } from "../lib/endpoints";
import { PageHeader } from "../components/PageHeader";
import { Card, CardContent, Spinner, Badge } from "../components/ui/primitives";
import { ConfirmDialog } from "../components/ui/Modal";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await messagesApi.list();
      setMessages(res.data.data);
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (msg) => {
    if (msg.read) return;
    try {
      await messagesApi.markRead(msg._id);
      setMessages((prev) => prev.map((m) => (m._id === msg._id ? { ...m, read: true } : m)));
    } catch {
      toast.error("Failed to mark as read");
    }
  };

  const handleDelete = async () => {
    try {
      await messagesApi.remove(deleteTarget._id);
      toast.success("Message deleted");
      setDeleteTarget(null);
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <PageHeader title="Messages" description="Submissions from your portfolio's contact form." />

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner className="h-8 w-8 text-primary" />
        </div>
      ) : messages.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10 text-muted-foreground">No messages yet.</CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <Card key={msg._id} onClick={() => markRead(msg)} className={!msg.read ? "border-primary/50" : ""}>
              <CardContent>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {msg.read ? (
                      <MailOpen size={16} className="text-muted-foreground mt-1" />
                    ) : (
                      <Mail size={16} className="text-primary mt-1" />
                    )}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{msg.name}</h3>
                        {!msg.read && <Badge>New</Badge>}
                      </div>
                      <p className="text-sm text-primary">{msg.email}</p>
                      {msg.subject && <p className="text-sm font-medium mt-1">{msg.subject}</p>}
                      <p className="text-sm text-muted-foreground mt-1">{msg.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTarget(msg);
                    }}
                    className="p-1.5 rounded-md hover:bg-secondary hover:text-destructive shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete this message?"
        description="This cannot be undone."
      />
    </div>
  );
}
