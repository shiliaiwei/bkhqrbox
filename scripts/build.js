const { execSync } = require("child_process");

const isInnerBuild = process.env.IS_OPEN_NEXT_CHILD === "true";

if (isInnerBuild) {
  console.log("[Build] Running inner Next.js production build...");
  execSync("next build", { stdio: "inherit" });
} else {
  console.log("[Build] Building SDK types and distributions...");
  try {
    execSync("tsc -p tsconfig.sdk.json", { stdio: "inherit" });
  } catch (e) {
    console.warn("[Build] SDK compilation warning, continuing...");
  }

  console.log("[Build] Building OpenNext Cloudflare Worker bundle...");
  execSync("opennextjs-cloudflare build --dangerouslyUseUnsupportedNextVersion", {
    stdio: "inherit",
    env: { ...process.env, IS_OPEN_NEXT_CHILD: "true" }
  });
}
