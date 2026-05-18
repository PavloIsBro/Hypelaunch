import { clusterApiUrl } from "@solana/web3.js";

export type SolanaCluster = "devnet" | "mainnet-beta" | "testnet";

function parseNetwork(raw: string | undefined): SolanaCluster {
  const v = (raw || "devnet").toLowerCase();
  if (v === "mainnet" || v === "mainnet-beta") return "mainnet-beta";
  if (v === "testnet") return "testnet";
  return "devnet";
}

export function getSolanaNetwork(): SolanaCluster {
  return parseNetwork(process.env.NEXT_PUBLIC_SOLANA_NETWORK);
}

export function getSolanaRpcEndpoint(): string {
  const cluster = getSolanaNetwork();
  if (process.env.NEXT_PUBLIC_SOLANA_RPC_URL?.trim()) {
    return process.env.NEXT_PUBLIC_SOLANA_RPC_URL.trim();
  }
  return clusterApiUrl(cluster);
}

export function getProjectWallet(): string {
  return (process.env.NEXT_PUBLIC_PROJECT_WALLET || "").trim();
}

export function getProPriceSol(): number {
  const raw = process.env.NEXT_PUBLIC_PRO_PRICE_SOL ?? "0.05";
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) && n > 0 ? n : 0.05;
}

export function getExtraPriceSol(): number {
  const raw = process.env.NEXT_PUBLIC_EXTRA_PRICE_SOL ?? "0.2";
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) && n > 0 ? n : 0.2;
}
