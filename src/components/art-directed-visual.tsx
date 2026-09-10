import type { VisualTone } from "@/data/catalog";

type ArtDirectedVisualProps = {
  tone: VisualTone;
  className?: string;
};

/** Original CSS material studies used until product photography is art directed. */
export function ArtDirectedVisual({ tone, className = "" }: ArtDirectedVisualProps) {
  return (
    <div
      aria-hidden="true"
      className={`art-visual art-visual--${tone} ${className}`}
    >
      <span className="art-visual__plane" />
      <span className="art-visual__object" />
      <span className="art-visual__line" />
    </div>
  );
}
