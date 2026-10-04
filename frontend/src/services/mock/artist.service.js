import artist from "@/mock/data/artist";
import { processMeta, processSteps } from "@/mock/data/process";
import { cached } from "../cache";

export function getArtist() {
  return cached("artist", () => artist);
}

export function getProcessData() {
  return cached("process", () => ({ steps: processSteps, meta: processMeta }));
}
