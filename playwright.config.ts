import { defineConfig } from "@playwright/test";

// Cross-browser policy (R3.3): Firefox + WebKit run only specs tagged
// `@cross-browser` (smoke). Chromium runs the full suite. Donor traffic
// is assumed Chromium-majority — revisit after analytics show otherwise.
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3001",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "firefox", use: { browserName: "firefox" }, grep: /@cross-browser/ },
    { name: "webkit", use: { browserName: "webkit" }, grep: /@cross-browser/ },
  ],
});
