// Simple classnames combiner (avoids pulling in clsx + tailwind-merge just for this)
export function cn(...inputs) {
  return inputs
    .flat()
    .filter(Boolean)
    .join(" ");
}
