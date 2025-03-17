import React, { FC } from "react";
import { LuArrowRightFromLine } from "react-icons/lu";
import { MdGeneratingTokens, MdToken } from "react-icons/md";
import { RiTokenSwapFill } from "react-icons/ri";
import { RxTokens } from "react-icons/rx";

interface FeatureViewProps {
  setOpenAirdrop: (open: boolean) => void;
  setOpenContact: (open: boolean) => void;
  setOpenTokenMetadata: (open: boolean) => void;
  setOpenCreateModal: (open: boolean) => void;
  setOpenSendTransaction: (open: boolean) => void;
}

export const FeatureView: FC<FeatureViewProps> = ({
  setOpenAirdrop,
  setOpenContact,
  setOpenTokenMetadata,
  setOpenCreateModal,
  setOpenSendTransaction,
}) => {
  const features = [
    {
      name: "Token Generator",
      icon: <MdGeneratingTokens />,
      description:
        "Welcome , work with our token generator as it allows you to create solana token by creating, deploying, airdrop, transfering and updating token",
      function: setOpenCreateModal,
    },

    {
      name: "Get AirDrop",
      icon: <MdToken />,
      description:
        "Welcome , work with our token generator as it allows you to create solana token by creating, deploying, airdrop, transfering and updating token",
      function: setOpenAirdrop,
    },

    {
      name: "Transfer Solana",
      icon: <RiTokenSwapFill />,
      description:
        "Welcome , work with our token generator as it allows you to create solana token by creating, deploying, airdrop, transfering and updating token",
      function: setOpenSendTransaction,
    },

    {
      name: "Token Meta Data",
      icon: <RxTokens />,
      description:
        "Welcome , work with our token generator as it allows you to create solana token by creating, deploying, airdrop, transfering and updating token",
      function: setOpenTokenMetadata,
    },
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-medium capitalize text-white">
              Choose Solana Blockchain Generator
            </h2>

            <p className="text-default-200 text-sm font-medium">
              You can now create the Solana Token <br />
              without coding and that too instantly
            </p>
          </div>
        </div>

        <div className="bg-default-950/40 flex flex-wrap items-center rounded-3xl backdrop-blur-3xl">
          {features.map((list, index) => (
            <div
              key={index}
              className={`w-auto grow border-b border-white/10 md:w-1/2 ${
                index == 0
                  ? "md:border-e"
                  : index == 1
                  ? ""
                  : index == 2
                  ? "md:border-e md:border-b-0"
                  : ""
              }`}
            >
              <div className="p-8 sm:p-10">
                <div className="bg-primary/10 text-primary mb-10 inline-flex h-16 w-16 items-center justify-center rounded-xl">
                  <i data-lucide="framer">{list.icon}</i>
                </div>

                <h2 className="mb-4 text-2xl text-white font-medium">
                  {list.name}
                </h2>

                <p className="text-default-200 mb-6 text-base">
                  {list.description}
                </p>

                <a
                  onClick={() => list.function(true)}
                  className="hover:bg-primary inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-white transition-all duration-300"
                >
                  Use the Tools
                  <i>
                    <LuArrowRightFromLine />
                  </i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
