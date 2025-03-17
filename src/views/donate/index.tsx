import React, { FC, useState, useCallback, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import useUserSOLBalanceStore from "stores/useUserSOLBalanceStore";

import { notify } from "utils/notifications";
import { AiOutlineClose } from "react-icons/ai";

// Internal
import { InputView } from "views/input";
import Branding from "components/Branding";

interface DonateViewProps {
  setOpenSendTransaction: (open: boolean) => void;
}

export const DonateView: FC<DonateViewProps> = ({ setOpenSendTransaction }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [amount, setAmount] = useState("0.0");

  const balance = useUserSOLBalanceStore((state) => state.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({
        type: "error",
        message: "Sorry",
        description: "Please connect your wallet first.",
      });
      return;
    }
    const creatorAddress = new PublicKey(
      "8ZiM7AT2TngRYKaacVnrbdKqnMceBeKvtx99Qnk9QEVr"
    );

    let signature: TransactionSignature = "";

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: creatorAddress,
          lamports: LAMPORTS_PER_SOL * Number(amount),
        })
      );

      signature = await sendTransaction(transaction, connection);

      notify({
        type: "success",
        message: `You have successfully transferred your funds ${amount}`,
        txid: signature,
      });
    } catch (error: any) {
      notify({
        type: "error",
        message: "Transaction Failed",
        description: error?.message,
        txid: signature,
      });
      return;
    }
  }, [publicKey, amount, sendTransaction, connection]);

  const CloseModal = () => (
    <a
      className="group mt-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-300 hover:bg-blue-600/60"
      onClick={() => {
        setOpenSendTransaction(false);
      }}
    >
      <i className="text-2xl text-white group-hover:text-white">
        <AiOutlineClose />
      </i>
    </a>
  );

  return (
    <>
      <section className="flex w-full items-center px-0 py-5 lg:h-screen lg:p-10">
        <div className="container">
          <div className="bg-default-950/40 mx-auto max-w-5xl rounded-3xl overflow-hidden backdrop-blur-2xl">
            <div className="grid gap-10 lg:grid-cols-2">
              {/* FIRST SECTION */}
              <Branding
                image="auth-img"
                title="To Build your Solana Token Creator"
                message="Try out and Create your first ever Solana Project , and if you wish to master Blockchain Development then check out my LinkedIn Group"
              />

              {/* SECOND SECTION */}
              <div className="lg:ps-0 flex h-full flex-col p-10">
                <div className="pb-10">
                  <a className="flex">
                    <img
                      src="assets/images/logo1.png"
                      alt="Logo"
                      className="h-12"
                    />
                  </a>
                </div>
                <div className="my-auto pb-6 text-center">
                  <h4 className="mb-4 text-2xl font-bold text-white">
                    {wallet && publicKey && (
                      <p>
                        SOL BALANCE: {(balance / LAMPORTS_PER_SOL).toFixed(2)}{" "}
                        SOL
                      </p>
                    )}
                  </h4>
                  <p className="text-default-300 mx-auto mb-5 max-w-sm">
                    Donate 1 Airdrop and use it to test and create token
                  </p>

                  <div className="flex items-start justify-center">
                    <img
                      src="assets/images/logout.svg"
                      alt=""
                      className="h-40"
                    />
                  </div>

                  <div className="text-start">
                    <InputView
                      name="Amount"
                      placeholder="amount"
                      clickhandle={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mb-6 text-center">
                    <button
                      onClick={onClick}
                      disabled={!publicKey}
                      className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-300"
                    >
                      <span className="fw-bold">Donate</span>
                    </button>

                    <CloseModal />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
