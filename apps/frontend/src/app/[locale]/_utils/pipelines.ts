import { AsyncPipeline } from "execution-pipeline";

export function testPipeline() {
  const pipeline = new AsyncPipeline();

  pipeline.add(async (prev) => {
    console.log("prev", prev);
    return prev + 1;
  });
}
