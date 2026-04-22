import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4399',
    trace: 'retain-on-failure'
  },
  webServer: {
    command: 'cross-env SKIP_LINK_GRAPH=1 npm run build && npm run preview -- --host 127.0.0.1 --port 4399',
    url: 'http://localhost:4399',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
});
