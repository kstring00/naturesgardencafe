import Link from "next/link";
import { LeafWreath } from "@/components/brand/LeafWreath";
import { Button } from "@/components/ui/Button";
import { site, telHref } from "@/content/site";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center px-5 text-center">
      <LeafWreath className="h-16 w-16 text-verde" />
      <h1 className="display mt-6 text-title">That page isn&rsquo;t on the carta.</h1>
      <p className="mt-5 max-w-md text-lg text-tinta-70">
        Head back to the menu, or call the café at{" "}
        <a className="underline decoration-trigo underline-offset-4" href={telHref}>
          {site.phone.display}
        </a>
        .
      </p>
      <div className="mt-8">
        <Button asChild variant="primary">
          <Link href="/">Back to the menu</Link>
        </Button>
      </div>
    </main>
  );
}
