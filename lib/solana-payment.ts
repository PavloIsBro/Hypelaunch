import type { Connection, TransactionSignature } from "@solana/web3.js";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import type { WalletContextState } from "@solana/wallet-adapter-react";

export type PaymentResult =
  | { ok: true; signature: TransactionSignature }
  | { ok: false; message: string };

function lamportsFromSol(amountSol: number): bigint {
  const lamports = Math.round(amountSol * LAMPORTS_PER_SOL);
  if (!Number.isFinite(lamports) || lamports <= 0) {
    throw new Error("Invalid SOL amount");
  }
  return BigInt(lamports);
}

/**
 * User signs a native SOL transfer from their wallet to the project wallet.
 * No private keys in the app — wallet extension signs.
 */
export async function paySolFromWallet(
  connection: Connection,
  wallet: WalletContextState,
  recipientAddress: string,
  amountSol: number,
): Promise<PaymentResult> {
  try {
    if (!wallet.publicKey) {
      return { ok: false, message: "Connect a Solana wallet first." };
    }
    if (!wallet.sendTransaction) {
      return { ok: false, message: "This wallet cannot send transactions." };
    }

    let recipient: PublicKey;
    try {
      recipient = new PublicKey(recipientAddress);
    } catch {
      return {
        ok: false,
        message: "Invalid project wallet in NEXT_PUBLIC_PROJECT_WALLET.",
      };
    }

    const lamports = lamportsFromSol(amountSol);
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed");

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: recipient,
        lamports,
      }),
    );
    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = blockhash;

    const signature = await wallet.sendTransaction(tx, connection, {
      skipPreflight: false,
    });

    const confirmation = await connection.confirmTransaction(
      { signature, blockhash, lastValidBlockHeight },
      "confirmed",
    );

    if (confirmation.value.err) {
      return { ok: false, message: "Transaction failed on-chain." };
    }

    return { ok: true, signature };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Payment failed.";
    return { ok: false, message: msg };
  }
}
