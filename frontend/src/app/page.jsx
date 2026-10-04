import { AakarProvider } from "@/hooks/useAakar";
import { MotionProvider } from "@/components/system/MotionProvider";
import { Home } from "@/components/home/Home";
import { getHomepagePayload } from "@/services/aakarService";

/**
 * Server entry: the payload is assembled by the service layer and handed to
 * the provider, so every section renders with real content on first paint.
 * When the API arrives, only `aakarService` changes.
 */
export default async function HomePage() {
  const payload = await getHomepagePayload();

  return (
    <AakarProvider initialData={payload}>
      <MotionProvider>
        <Home />
      </MotionProvider>
    </AakarProvider>
  );
}
