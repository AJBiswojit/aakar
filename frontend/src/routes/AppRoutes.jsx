import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { SiteLayout } from "@/components/common/SiteLayout";
import { RouteNotice } from "@/components/common/RouteNotice";

const Home = lazy(() => import("@/pages/Home/Home"));
const CollectionPage = lazy(() => import("@/pages/Collection/Collection"));
const ProductPage = lazy(() => import("@/pages/Product/Product"));
const StudioPage = lazy(() => import("@/pages/Studio/Studio"));
const AboutPage = lazy(() => import("@/pages/About/About"));
const ContactPage = lazy(() => import("@/pages/Contact/Contact"));
const CartPage = lazy(() => import("@/pages/Cart/Cart"));
const CheckoutPage = lazy(() => import("@/pages/Checkout/Checkout"));
const AccountPage = lazy(() => import("@/pages/Account/Account"));

/** Quiet AAKAR-consistent route fallback: a label and the cobalt scan line. */
function RouteFallback() {
  return (
    <main id="main" className="tone-light route-message flex items-center justify-center">
      <div className="flex flex-col items-center gap-4" role="status">
        <p className="u-label text-mute">PREPARING THE ATELIER</p>
        <span className="block h-px w-28 overflow-hidden bg-hair">
          <span className="block h-full w-1/3 bg-cobalt motion-safe:animate-[aakar-scan_1.7s_var(--ease-out-soft)_infinite]" />
        </span>
      </div>
    </main>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/collection"
          element={
            <Suspense fallback={<RouteFallback />}>
              <CollectionPage />
            </Suspense>
          }
        />
        <Route
          path="/product/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProductPage />
            </Suspense>
          }
        />
        <Route
          path="/studio"
          element={
            <Suspense fallback={<RouteFallback />}>
              <StudioPage />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ContactPage />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<RouteFallback />}>
              <CartPage />
            </Suspense>
          }
        />
        <Route
          path="/checkout"
          element={
            <Suspense fallback={<RouteFallback />}>
              <CheckoutPage />
            </Suspense>
          }
        />
        <Route
          path="/account"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AccountPage />
            </Suspense>
          }
        />
        <Route path="*" element={<RouteNotice eyebrow="AAKAR / 404" title="This form does not exist.">The page you are looking for is not in this collection.</RouteNotice>} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
