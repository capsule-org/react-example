import Capsule, { Environment } from "@usecapsule/react-sdk";

// Get an api key at usecapsule.com
const TEST_API_KEY = "bdb8dbc5e5527967e9cfdf28d5f21df7";

export const environment = Environment.DEV;

export const capsule = new Capsule(Environment.DEV, TEST_API_KEY, {
  homepageUrl: "www.blue.com",
});
