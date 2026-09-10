import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.25fr_1fr] lg:px-12 lg:py-16">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] uppercase">Saan Market</p>
          <p className="mt-5 max-w-md text-lg leading-8 text-blue-100">
            Contemporary Thai home and lifestyle goods, imagined as a frontend portfolio project.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-semibold text-white">Explore</p>
            <ul className="mt-4 space-y-3 text-blue-200">
              <li><Link className="rounded-sm hover:text-white" href="/shop">Shop</Link></li>
              <li><Link className="rounded-sm hover:text-white" href="/#collections">Collections</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Project note</p>
            <p className="mt-4 leading-6 text-blue-200">No products are sold. No account or payment data is collected.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
