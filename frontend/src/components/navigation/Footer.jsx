"use client";

import { useMotion } from "@/components/system/MotionProvider";
import { useSite } from "@/hooks/useAakar";
import { Reveal } from "@/components/ui/SectionLabel";

/** Quiet black footer — navigation, contact, legal. Nothing more. */
export function Footer() {
  const site = useSite();
  const { scrollTo } = useMotion();
  const footer = site?.footer;
  const year = 2026;

  if (!footer) return null;

  return (
    <footer data-nav-theme="dark" className="tone-dark grain relative overflow-hidden pt-20 pb-10 lg:pt-28">
      <div className="shell relative z-10">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-[1.35rem] font-medium uppercase tracking-[0.34em] text-white">
              {site?.brand?.name ?? "AAKAR"}
            </p>
            <p className="u-label mt-4 text-white/40">{site?.brand?.statement}</p>
            <p className="u-body mt-6 max-w-[22rem] text-white/50">{footer.closing}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-6">
            <p className="u-label text-white/30">Navigate</p>
            <ul className="mt-5 flex flex-col gap-3">
              {footer.navigate.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (!item.href.startsWith("#")) return;
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className="u-label link-underline text-white/65 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2 md:col-start-9">
            <p className="u-label text-white/30">Elsewhere</p>
            <ul className="mt-5 flex flex-col gap-3">
              {footer.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="u-label link-underline text-white/65 transition-colors hover:text-cobalt-light"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 md:col-start-11">
            <p className="u-label text-white/30">Contact</p>
            <address className="mt-5 not-italic">
              <p className="u-label-sm leading-relaxed text-white/65">{footer.contact?.studio}</p>
              <p className="u-label-sm mt-3 leading-relaxed text-white/45">{footer.contact?.address}</p>
              <a
                href={`mailto:${footer.contact?.email}`}
                className="u-label-sm mt-3 block text-cobalt-light transition-opacity hover:opacity-80"
              >
                {footer.contact?.email}
              </a>
              <p className="u-label-sm mt-3 leading-relaxed text-white/35">{footer.contact?.hours}</p>
            </address>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.legal.map((l) => (
              <li key={l.label} id={l.href === "#legal" ? "legal" : undefined}>
                <a href={l.href} className="u-label-sm text-white/40 transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Reveal as="p" className="u-label-sm text-white/30">
            © {year} {site?.brand?.name ?? "AAKAR"} · {site?.brand?.meaning} · ALL FORMS RESERVED
          </Reveal>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="u-display pointer-events-none absolute -bottom-[3vw] left-1/2 -translate-x-1/2 select-none text-[22vw] leading-none text-white/[0.04]"
      >
        {site?.brand?.name ?? "AAKAR"}
      </span>
    </footer>
  );
}

export default Footer;
