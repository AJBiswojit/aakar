import artist from "@/mock/data/artist";
import { processMeta, processSteps } from "@/mock/data/process";

export async function getArtist() {
  return artist;
}

export async function getProcessData() {
  return { steps: processSteps, meta: processMeta };
}
