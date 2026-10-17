import { empanadaChapters } from "@/lib/story";
import { HistoriasPinned } from "./HistoriasPinned";

/**
 * Tres historias: three empanadas, three stories in Marina's words.
 * Hides entirely until at least one story exists in content/story.json.
 */
export function TresHistorias() {
  const chapters = empanadaChapters();
  if (chapters.length === 0) return null;
  return (
    <section id="historias" className="scroll-mt-24 py-16 sm:py-24" aria-labelledby="historias-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 id="historias-title" className="display text-title">
          Tres historias
        </h2>
      </div>
      <HistoriasPinned chapters={chapters} />
    </section>
  );
}
