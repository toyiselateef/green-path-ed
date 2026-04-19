import { cn } from "@/lib/utils";

// Deterministic gradient pick for a school based on its name/slug.
const palettes = [
  "from-emerald-500 to-teal-600",
  "from-blue-500 to-indigo-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-sky-600",
  "from-lime-500 to-green-600",
  "from-fuchsia-500 to-rose-600",
];

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

export function getSchoolPalette(key: string) {
  return palettes[hash(key) % palettes.length];
}

export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

interface SchoolLogoProps {
  name: string;
  slug?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-8 w-8 text-[11px]",
  md: "h-10 w-10 text-xs",
  lg: "h-14 w-14 text-base",
};

export function SchoolLogo({ name, slug, size = "md", className }: SchoolLogoProps) {
  const palette = getSchoolPalette(slug || name);
  return (
    <span
      className={cn(
        "relative grid place-items-center rounded-xl bg-gradient-to-br text-white font-bold shadow-sm ring-1 ring-white/15 overflow-hidden",
        palette,
        sizeMap[size],
        className,
      )}
      aria-label={`${name} logo`}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
      <span className="relative tracking-tight">{getInitials(name)}</span>
    </span>
  );
}
