import { CapsuleEthersSigner } from "@usecapsule/web-sdk";
import { ethers } from "ethers";
import { INFURA_HOST } from "../constants";
import { capsule } from "./capsule";

const provider = new ethers.JsonRpcProvider(INFURA_HOST, "sepolia");
export const ethersSigner = new CapsuleEthersSigner(capsule, provider as any);
