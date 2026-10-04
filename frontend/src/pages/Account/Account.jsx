import { RouteNotice } from "@/components/common/RouteNotice";

export function AccountPage() {
  return (
    <RouteNotice eyebrow="AAKAR / Account" title="Customer accounts are not connected yet.">
      Account, order history and protected downloads will be enabled when a backend is available.
    </RouteNotice>
  );
}

export default AccountPage;
