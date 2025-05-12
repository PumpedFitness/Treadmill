import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.pumped.treadmill',
  appName: 'Pumped',
  webDir: 'dist',
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    "CapacitorCookies": {
      "enabled": true
    }
  },
  "server": {
    "url": "http://localhost:5173",
    "cleartext": true
  },
};

export default config;
