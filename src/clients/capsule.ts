import Capsule, { Environment } from "@usecapsule/react-sdk";

// Get an api key at usecapsule.com
const TEST_API_KEY = "f8dd02178bfcdb4a95e9ee94d77a2661";

export const environment = Environment.DEV;

export const capsule = new Capsule(Environment.DEV, TEST_API_KEY);
