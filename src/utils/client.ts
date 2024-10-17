import { Chain, createPublicClient, http } from "viem";
import {
  sepolia,
  optimism,
  polygon,
  arbitrum,
  base,
  avalanche,
  gnosis,
  bsc,
  baseSepolia,
} from "viem/chains";

export function getClient(chainId: number) {
  let chain: Chain = optimism;

  if (chainId == 10) chain = optimism;
  if (chainId == 8453) chain = base;
  if (chainId == 137) chain = polygon;
  if (chainId == 42161) chain = arbitrum;
  if (chainId == 43114) chain = avalanche;
  if (chainId == 100) chain = gnosis;
  if (chainId == 56) chain = bsc;

  if (chainId == 84532) chain = baseSepolia;
  if (chainId == 11155111) chain = sepolia;

  return createPublicClient({
    chain: chain,
    transport: http(),
  });
}
