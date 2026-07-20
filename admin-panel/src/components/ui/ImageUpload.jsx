import { useRef, useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { uploadFile } from "../../lib/endpoints";
import { cn } from "../../lib/utils";

// Controlled component: value = image URL string, onChange(url) updates parent form state
export function ImageUpload({ value, onChange, label = "Image" }) {
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setUploading(true);
    setProgress(0);
    try {
      const res = await uploadFile(file, setProgress);
      onChange(res.data.data.url);
      toast.success("Image uploaded");
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
        <div className="relative w-full max-w-xs">
          <img src={value} alt="Uploaded" className="w-full rounded-lg border border-border object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow"
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
              <span className="text-xs text-muted-foreground">Click or drag an image here</span>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
