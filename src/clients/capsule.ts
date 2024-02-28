import { Environment } from "@usecapsule/web-sdk";
import Capsule from "@usecapsule/web-sdk";
import { isProd } from "../constants";

// Get an api key at usecapsule.com
const API_KEY = isProd
  ? "ea0dbf5ed0ebbc6f1256b753672a6a18"
  : "d0b61c2c8865aaa2fb12886651627271";

export const environment = isProd ? Environment.PROD : Environment.DEVELOPMENT;

export const capsule = new Capsule(environment, API_KEY, {
  emailPrimaryColor: "#FE452B",
  emailTheme: "light" as any,
  homepageUrl: "https://www.usecapsule.com",
  supportUrl: "mailto:support@usecapsule.com",
  xUrl: "https://twitter.com/usecapsule",
  linkedinUrl: "https://www.linkedin.com/company/usecapsule",
  portalBackgroundColor: "#000000",
  portalPrimaryButtonColor: "#FE452B",
  portalPrimaryButtonTextColor: "#FFFFFF",
  portalTextColor: "#FFFFFF",
});
