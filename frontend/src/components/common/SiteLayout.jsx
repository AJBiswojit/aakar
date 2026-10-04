import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Cursor } from "@/components/ui/Cursor";
import { Footer } from "@/components/navigation/Footer";
import { Navbar } from "@/components/navigation/Navbar";
import { OverlayHost } from "@/components/common/OverlayHost";
import { useMotion } from "@/components/common/MotionProvider";

export function SiteLayout() {
  const location = useLocation();
  const { scrollTo } = useMotion();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (location.hash) {
        scrollTo(location.hash);
      } else {
        scrollTo(0, { duration: 0 });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, scrollTo]);

  return (
    <>
      <a
        href="#main"
        className="u-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-cobalt focus:px-4 focus:py-3 focus:text-white"
      >
        SKIP TO MAIN CONTENT
      </a>
      <Navbar />
      <Outlet />
      <Footer />
      <OverlayHost />
      <Cursor />
    </>
  );
}
