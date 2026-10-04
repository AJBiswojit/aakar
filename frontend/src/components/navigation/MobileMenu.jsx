import { useNavigate } from "react-router-dom";
import { useSite } from "@/hooks/useSite";
import { useOverlay } from "@/state/app/AppContext";
import { cx } from "@/utils/format";
import { IconArrowRight } from "@/components/ui/Icons";
import { OverlayShell } from "@/components/common/OverlayShell";

/** Fullscreen mobile menu. */
export function MobileMenu() {
  const { kind, closeOverlay } = useOverlay();
  const { data: site } = useSite();
  const navigate = useNavigate();
  const open = kind === "menu";

  return (
    <OverlayShell open={open} onClose={closeOverlay} label="Menu" align="full">
      <div className="tone-dark grain relative flex h-full w-full flex-col justify-between overflow-y-auto px-7 pb-10 pt-20 sm:px-10">
        <p className="u-label text-white/35">Navigation / AAKAR</p>

        <nav aria-label="Mobile" className="mt-10">
          <ul className="flex flex-col">
            {(site?.navigation?.links ?? []).map((link, i) => (
              <li key={link.id} className="border-t border-white/10 last:border-b">
                <a
                  href={link.href}
                  onClick={(event) => {
                    if (!link.href.startsWith("#")) return;
                    event.preventDefault();
                    closeOverlay();
                    navigate(`/${link.href}`);
                  }}
                  className="group flex items-center justify-between py-5"
                >
                  <span className="u-display flex items-baseline gap-4 text-[2.35rem] leading-none text-white transition-colors duration-500 group-hover:text-cobalt-light sm:text-[3rem]">
                    <span className={cx("u-label text-cobalt-light/70")}>{String(i + 1).padStart(2, "0")}</span>
                    {link.label}
                  </span>
                  <IconArrowRight className="text-white/30 transition-all duration-500 group-hover:translate-x-1 group-hover:text-cobalt-light" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {(site?.footer?.social ?? []).map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer noopener" className="u-label link-underline text-white/55 hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={site?.footer?.contact?.email ? `mailto:${site.footer.contact.email}` : "#commission"} className="u-label text-cobalt-light">
            START A PROJECT →
          </a>
        </div>
      </div>
    </OverlayShell>
  );
}

export default MobileMenu;
