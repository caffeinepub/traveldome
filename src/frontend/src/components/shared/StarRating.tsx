import { Star } from "lucide-react";

interface Props {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export default function StarRating({
  rating,
  max = 5,
  size = "md",
  interactive = false,
  onChange,
}: Props) {
  const sizes = { sm: "w-3.5 h-3.5", md: "w-5 h-5", lg: "w-6 h-6" };
  const cls = sizes[size];

  const stars = Array.from({ length: max }, (_, i) => i + 1);
  return (
    <div className="flex gap-0.5">
      {stars.map((starNum) => {
        const filled = starNum <= Math.round(rating);
        return (
          <Star
            key={`star-${starNum}`}
            className={`${cls} transition-colors ${
              filled
                ? "text-gold fill-gold"
                : "text-muted-foreground/30 fill-muted-foreground/10"
            } ${interactive ? "cursor-pointer hover:scale-110" : ""}`}
            onClick={
              interactive && onChange ? () => onChange(starNum) : undefined
            }
          />
        );
      })}
    </div>
  );
}
