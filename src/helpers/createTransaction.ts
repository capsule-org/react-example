import { web3 } from "../clients/web3";

export const createTransaction = async (
  walletAddress: string,
  toAddress: string,
  value: string,
  gasAmount: string,
  maxPriorityFeePerGas: string | null,
  maxFeePerGas: string,
  nonce: number,
  chainId: string,
  contractAbi: string,
  functionName: string,
  functionArgs: string[],
  deployByteCode: string
) => {
  let functionCallData;
  if (functionName && contractAbi) {
    const contract = new web3.eth.Contract(JSON.parse(contractAbi), toAddress);
    functionCallData = contract.methods[functionName](
      ...functionArgs
    ).encodeABI();
  }

  const tx = {
    from: walletAddress,
    to: toAddress,
    value: value
      ? web3.utils.toHex(web3.utils.toWei(value, "ether"))
      : undefined,
    gasLimit: web3.utils.toHex(Number(gasAmount)),
    maxPriorityFeePerGas: maxPriorityFeePerGas
      ? web3.utils.toHex(web3.utils.toWei(maxPriorityFeePerGas, "gwei"))
      : undefined,
    maxFeePerGas: maxFeePerGas
      ? web3.utils.toHex(web3.utils.toWei(maxFeePerGas, "gwei"))
      : undefined,
    nonce: web3.utils.toHex(nonce),
    data: functionCallData || deployByteCode || undefined,
    chainId,
    type: 2,
  };
  return tx;
};
