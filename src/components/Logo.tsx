import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  showTag?: boolean;
}

export function Logo({ className, variant = "dark", size = "md", showTag = false }: LogoProps) {
  const sizeMap = { sm: "text-lg", md: "text-xl", lg: "text-3xl" };
  const dot = { sm: "h-6 w-6", md: "h-7 w-7", lg: "h-9 w-9" };
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2.5 group", className)}>
      <span
        className={cn(
          "relative grid place-items-center rounded-xl shadow-md-soft transition-transform duration-300 group-hover:scale-105",
          dot[size],
          variant === "light" ? "bg-white/15 backdrop-blur" : "bg-gradient-brand"
        )}
      >
        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent" />
        <svg viewBox="0 0 24 24" fill="none" className="relative h-3.5 w-3.5 text-white">
          <path d="M3 7l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M7 10v4c0 1.5 2.5 3 5 3s5-1.5 5-3v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-bold tracking-tight",
            sizeMap[size],
            variant === "light" ? "text-white" : "text-foreground"
          )}
        >
          EdPlix
        </span>
        {showTag && (
          <span className={cn("mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em]", variant === "light" ? "text-white/60" : "text-muted-foreground")}>
            School OS
          </span>
        )}
      </span>
    </Link>
  );
}
