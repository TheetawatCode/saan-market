import { ArtDirectedVisual } from "@/components/art-directed-visual";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { collections, getFeaturedProducts } from "@/data/catalog";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const promises = [
  ["Considered materials", "Useful textures, honest finishes, and pieces made to be handled."],
  ["Small-batch rhythm", "Made in limited runs with room for craft, variation, and care."],
  ["Made for daily life", "For the kitchen table, the desk, and the quiet in-between."],
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div id="top" className="min-h-screen overflow-x-clip bg-canvas text-ink">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main-content">
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-12 lg:py-24">
          <div className="lg:col-span-6">
            <p className="section-eyebrow">Contemporary Thai living</p>
            <h1 className="mt-5 max-w-2xl text-5xl leading-[0.96] font-semibold tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
              The useful things are often the ones you keep closest.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-ink-muted">
              Saan Market gathers contemporary Thai home goods with texture,
              purpose, and a quiet sense of place—made for the rituals that
              make a home feel lived in.
            </p>
            <Link className="primary-link mt-8" href="/shop">
              Explore the collection <span aria-hidden="true">↓</span>
            </Link>
          </div>
          <div className="lg:col-span-6">
            <div className="hero-visual aspect-[5/4] overflow-hidden rounded-[1.5rem] border border-border sm:aspect-[16/11]">
              <Image
                src="/images/saan-home-hero-indigo-linen.png"
                alt=""
                width={1600}
                height={1100}
                priority
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="promise-heading" className="border-y border-border bg-surface">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
            <p className="section-eyebrow">A quieter kind of commerce</p>
            <h2 id="promise-heading" className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Objects with a reason to be there.
            </h2>
            <div className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-3">
              {promises.map(([title, body]) => (
                <div key={title}>
                  <h3 className="text-base font-semibold text-ink">{title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-ink-muted">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="collections" aria-labelledby="collections-heading" className="scroll-mt-6 mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="flex max-w-2xl flex-col gap-4">
            <p className="section-eyebrow">Curated for the everyday</p>
            <h2 id="collections-heading" className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Collections that start with how you live.
            </h2>
            <p className="text-base leading-7 text-ink-muted">
              Each grouping brings useful materials and unforced character into focus.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {collections.map((collection, index) => (
              <article key={collection.id} className={index === 1 ? "md:pt-12" : ""}>
                <ArtDirectedVisual
                  tone={collection.visualTone}
                  className="aspect-[4/5] overflow-hidden rounded-2xl border border-border"
                />
                <p className="mt-5 text-xs font-semibold tracking-[0.14em] text-earth uppercase">
                  {collection.eyebrow}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">{collection.title}</h3>
                <p className="mt-3 max-w-sm leading-7 text-ink-muted">{collection.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="featured" aria-labelledby="featured-heading" className="scroll-mt-6 bg-surface-muted">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-eyebrow">Selected objects</p>
                <h2 id="featured-heading" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  Made to return to, every day.
                </h2>
              </div>
              <Link className="text-link" href="/shop">View all objects <span aria-hidden="true">→</span></Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 min-[440px]:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section id="our-story" aria-labelledby="story-heading" className="scroll-mt-6 mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-16 lg:px-12 lg:py-24">
          <div className="lg:col-span-5">
            <Image
              src="/images/saan-maker-table-study.png"
              alt=""
              width={1200}
              height={1200}
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="aspect-square h-full w-full overflow-hidden rounded-[1.5rem] border border-border object-cover"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="section-eyebrow">The Saan point of view</p>
            <h2 id="story-heading" className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Less noise. More feeling for the everyday.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink-muted">
              We look for pieces that respect their material and reward a second look.
              The point is not perfection; it is the small reassurance of using something
              made with attention.
            </p>
            <p className="mt-5 max-w-xl leading-7 text-ink-muted">
              Saan is a fictional portfolio storefront. Its objects, makers, and places are
              imagined with care for contemporary Thai craft and daily life.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
