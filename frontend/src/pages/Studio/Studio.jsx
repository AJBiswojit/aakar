import { StudioSection } from "@/components/studio/ArtistIntro";
import { ProcessSection } from "@/components/studio/ProcessTimeline";
import { CustomProject } from "@/components/studio/CustomProject";

export function StudioPage() {
  return (
    <main id="main">
      <StudioSection />
      <ProcessSection />
      <CustomProject />
    </main>
  );
}

export default StudioPage;
