import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.pumped.treadmill',
  appName: 'Pumped',
  webDir: 'dist',
  server: {
    url: "http://localhost:5173",
    cleartext: true,
  }
};

export default config;
