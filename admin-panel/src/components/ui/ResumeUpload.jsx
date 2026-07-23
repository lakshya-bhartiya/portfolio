import { useRef, useState } from "react";
import { UploadCloud, X, Loader2, FileText, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { uploadFile } from "../../lib/endpoints";
import { cn } from "../../lib/utils";

// Controlled component: value = resume URL string, onChange(url) updates parent form state
export function ResumeUpload({ value, onChange, label = "Resume" }) {
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }
    setUploading(true);
    setProgress(0);
    try {
      const res = await uploadFile(file, setProgress);
      onChange(res.data.data.url);
      toast.success("Resume uploaded");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {label && <label className="text-sm font-medium text-foreground/90 mb-1.5 block">{label}</label>}

      {value ? (
        <div className="relative flex items-center gap-3 w-full max-w-xs rounded-lg border border-border bg-secondary/40 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/15">
            <FileText size={18} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Resume.pdf</p>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              View <ExternalLink size={11} />
            </a>
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-full bg-destructive p-1 text-destructive-foreground shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={cn(
            "flex w-full max-w-xs cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-secondary/30 p-6 text-center hover:bg-secondary/50",
            uploading && "pointer-events-none opacity-70"
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="animate-spin" size={22} />
              <span className="text-xs text-muted-foreground">Uploading... {progress}%</span>
            </>
          ) : (
            <>
              <UploadCloud size={22} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Click or drag your resume PDF here</span>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
