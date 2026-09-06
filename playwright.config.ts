import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  use: {
    baseURL: "http://127.0.0.1:4321"
  },
  webServer: {
    command:
      "trap 'npm run dev -- stop >/dev/null 2>&1; trap - EXIT; exit 0' EXIT INT TERM; npm run dev -- --host 127.0.0.1; while true; do sleep 1; done",
    env: {
      ASTRO_TELEMETRY_DISABLED: "1"
    },
    port: 4321,
    reuseExistingServer: false,
    gracefulShutdown: {
      signal: "SIGTERM",
      timeout: 5_000
    }
  }
});
