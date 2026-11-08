import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.nkbfinance.app",
  appName: "NKB Finance",
  webDir: "work/apk-next",
  server: {
    androidScheme: "https",
  },
};

export default config;
