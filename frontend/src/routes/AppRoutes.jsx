import { Route, Routes } from "react-router-dom";
import { SiteLayout } from "@/components/common/SiteLayout";
import Home from "@/pages/Home/Home";
import CollectionPage from "@/pages/Collection/Collection";
import ProductPage from "@/pages/Product/Product";
import StudioPage from "@/pages/Studio/Studio";
import AboutPage from "@/pages/About/About";
import ContactPage from "@/pages/Contact/Contact";
import CartPage from "@/pages/Cart/Cart";
import CheckoutPage from "@/pages/Checkout/Checkout";
import AccountPage from "@/pages/Account/Account";
import { RouteNotice } from "@/components/common/RouteNotice";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<RouteNotice eyebrow="AAKAR / 404" title="This form does not exist.">The page you are looking for is not in this collection.</RouteNotice>} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
