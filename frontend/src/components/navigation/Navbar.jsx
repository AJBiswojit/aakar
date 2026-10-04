import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cx } from "@/utils/format";
import { IconBag, IconHeart, IconMenu, IconSearch } from "@/components/ui/Icons";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useOverlay } from "@/state/app/AppContext";
import { useSite } from "@/hooks/useSite";
import { useMotion } from "@/components/common/MotionProvider";

/**
 * AAKAR navbar — thin, quiet, and reactive: it inverts against whichever
 * section is passing underneath it and carries a 1px cobalt progress rail.
 */
export function Navbar() {
  const { data: site } = useSite();
  const { scrollTo } = useMotion();
  const { kind, openOverlay } = useOverlay();
  const location = useLocation();
  const navigate = useNavigate();
  const cart = useCart();
  const wishlist = useWishlist();

  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tone, setTone] = useState("dark");
  const [active, setActive] = useState("");
  const frame = useRef(0);

  const links = site?.navigation?.links ?? [];

  const measure = useCallback(() => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const y = window.scrollY || doc.scrollTop || 0;
    setScrollY(y);
    setProgress(max > 0 ? Math.min(1, y / max) : 0);

    const line = 88;
    const themed = document.querySelectorAll("[data-nav-theme]");
    let nextTone = "light";
    themed.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top <= line && r.bottom > line) nextTone = el.getAttribute("data-nav-theme");
    });
    setTone(nextTone);

    let nextActive = "";
    document.querySelectorAll("[data-nav-id]").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top <= window.innerHeight * 0.42 && r.bottom > window.innerHeight * 0.28) {
        nextActive = el.getAttribute("data-nav-id");
      }
    });
    setActive(nextActive);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(measure);
    };
    frame.current = requestAnimationFrame(measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measure]);

  const go = (href) => (event) => {
    if (!href?.startsWith("#")) return;
    event.preventDefault();
    if (location.pathname === "/") scrollTo(href);
    else navigate(`/${href}`);
  };

  const dark = tone === "dark";
  const solid = scrollY > 24;

  const counts = useMemo(
    () => ({ wishlist: wishlist.count, cart: cart.count }),
    [wishlist.count, cart.count],
  );

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-[70] transition-[background-color,color,backdrop-filter,border-color] duration-700 ease-out",
        dark ? "text-white" : "text-ink",
        solid && (dark ? "bg-obsidian/72 backdrop-blur-[14px]" : "bg-white/82 backdrop-blur-[14px]"),
      )}
      style={{ borderBottom: `1px solid ${solid ? (dark ? "var(--color-nav-border-dark)" : "var(--color-nav-border-light)") : "transparent"}` }}
    >
      {/* scroll progress — cobalt, 1px */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px overflow-hidden bg-transparent">
        <div
          className="h-full origin-left bg-cobalt transition-transform duration-200 ease-out"
          style={{ transform: `scaleX(${Math.max(0.001, progress)})` }}
        />
      </div>

      <nav className="shell flex h-[62px] items-center justify-between gap-2 sm:gap-6 md:h-[76px]" aria-label="Primary">
        {/* ------------------------------- brand ------------------------------- */}
        <a
          href="#arrival"
          onClick={go("#arrival")}
          className="group flex items-baseline gap-3"
          data-cursor=""
          aria-label="AAKAR — home"
        >
          <span className="font-display text-[1.05rem] font-medium uppercase leading-none tracking-[0.34em] md:text-[1.2rem]">
            AAKAR
          </span>
          <span
            className={cx(
              "u-label-sm hidden transition-opacity duration-500 sm:inline",
              dark ? "text-white/35" : "text-mute",
            )}
          >
            {site?.brand?.meaning ?? "आकार · FORM"}
          </span>
        </a>

        {/* ------------------------------ navigation ---------------------------- */}
        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={go(link.href)}
                  data-cursor=""
                  aria-current={isActive ? "true" : undefined}
                  className={cx(
                    "u-label group relative py-2 transition-colors duration-500",
                    isActive ? "text-cobalt-light" : dark ? "text-white/60 hover:text-white" : "text-ink/55 hover:text-ink",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cx(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-cobalt transition-transform duration-500 ease-out",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* ------------------------------- utility ------------------------------ */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => openOverlay("search")}
            aria-label="Search the atelier"
            aria-haspopup="dialog"
            aria-expanded={kind === "search"}
            className={cx(
              "flex items-center gap-2 border border-transparent px-1 py-2 transition-colors duration-500 hover:border-cobalt hover:text-cobalt sm:px-2",
              dark ? "text-white/70" : "text-ink/65",
            )}
          >
            <IconSearch />
            <span className="u-label hidden xl:inline">SEARCH</span>
          </button>

          <button
            type="button"
            onClick={() => openOverlay("wishlist")}
            aria-label={`Wishlist, ${counts.wishlist} items`}
            aria-haspopup="dialog"
            aria-expanded={kind === "wishlist"}
            className={cx(
              "relative flex items-center gap-2 px-1 py-2 transition-colors duration-500 hover:text-cobalt sm:px-2",
              dark ? "text-white/70" : "text-ink/65",
            )}
          >
            <IconHeart filled={counts.wishlist > 0} />
            <span className="u-label hidden tabular-nums sm:inline">{String(counts.wishlist).padStart(2, "0")}</span>
          </button>

          <button
            type="button"
            onClick={() => openOverlay("cart")}
            aria-label={`Cart, ${counts.cart} items`}
            aria-haspopup="dialog"
            aria-expanded={kind === "cart"}
            className={cx(
              "relative flex items-center gap-2 px-1 py-2 transition-colors duration-500 hover:text-cobalt sm:px-2",
              dark ? "text-white/70" : "text-ink/65",
            )}
          >
            <IconBag />
            <span className="u-label hidden tabular-nums sm:inline">{String(counts.cart).padStart(2, "0")}</span>
            {counts.cart > 0 ? (
              <span aria-hidden="true" className="absolute right-0.5 top-1 h-1 w-1 rounded-full bg-cobalt" />
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => openOverlay("menu")}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={kind === "menu"}
            className={cx(
              "ml-1 flex items-center gap-2 px-1 py-2 sm:px-2 lg:hidden",
              dark ? "text-white" : "text-ink",
            )}
          >
            <IconMenu />
            <span className="u-label hidden sm:inline">MENU</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
