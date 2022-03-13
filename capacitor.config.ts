import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "formSurveyior",
  webDir: "build",
  bundledWebRuntime: false,
  server: {
    androidScheme: "http",
    allowNavigation: ["https://formsurvey-controllerservice.herokuapp.com/"],
  },
};

export default config;
