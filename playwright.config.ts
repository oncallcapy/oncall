import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/smoke",
  testMatch: "**/*.spec.ts",
  use: {
    baseURL: "http://127.0.0.1:4321"
  },
  webServer: {
    // The dev API stays in the foreground; Astro's CLI auto-daemonizes in agent environments.
    command:
      "node --input-type=module -e \"import { dev } from 'astro'; await dev({ server: { host: '127.0.0.1', port: 4321 } });\"",
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
