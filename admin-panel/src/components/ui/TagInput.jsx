import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Input } from "./primitives";

// value = array of strings, onChange(newArray)
export function TagInput({ value = [], onChange, placeholder = "Type and press Enter" }) {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...value, trimmed]);
    setDraft("");
  };

  const removeTag = (idx) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 rounded-full bg-primary/15 text-primary px-2.5 py-1 text-xs font-medium"
          >
            {tag}
            <button type="button" onClick={() => removeTag(idx)} className="hover:text-destructive">
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={addTag}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border hover:bg-secondary"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
