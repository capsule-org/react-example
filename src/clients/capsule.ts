import { Environment } from "@usecapsule/web-sdk";
import Capsule from "@usecapsule/web-sdk";
import { isProd } from "../constants";

// Get an api key at usecapsule.com
const TEST_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

export const environment = isProd ? Environment.PROD : Environment.DEVELOPMENT;

export const capsule = new Capsule(environment, TEST_API_KEY);
