import { Environment } from "@usecapsule/react-sdk";
import Capsule from "@usecapsule/react-sdk";

// Get an api key at usecapsule.com
const TEST_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

export const environment = Environment.DEVELOPMENT;

export const capsule = new Capsule(environment, TEST_API_KEY);
