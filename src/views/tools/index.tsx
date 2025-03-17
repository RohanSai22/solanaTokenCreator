import React, { FC } from "react";
import { MdGeneratingTokens } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LuArrowRight } from "react-icons/lu"; // Importing a better arrow icon from Lucide

interface ToolView {
  setOpenAirdrop: (open: boolean) => void;
  setOpenContact: (open: boolean) => void;
  setOpenTokenMetadata: (open: boolean) => void;
  setOpenCreateModal: (open: boolean) => void;
  setOpenSendTransaction: (open: boolean) => void;
}

export const ToolView: FC<ToolView> = ({
  setOpenAirdrop,
  setOpenContact,
  setOpenTokenMetadata,
  setOpenCreateModal,
  setOpenSendTransaction,
}) => {
  const tools = [
    {
      name: "Create Token",
      icon: <MdGeneratingTokens />,
      function: setOpenCreateModal,
    },
    {
      name: "Token Metadata",
      icon: <MdGeneratingTokens />,
      function: setOpenTokenMetadata,
    },
    {
      name: "Contact Us",
      icon: <MdGeneratingTokens />,
      function: setOpenContact,
    },
    {
      name: "Airdrop",
      icon: <MdGeneratingTokens />,
      function: setOpenAirdrop,
    },
    {
      name: "Send Transaction",
      icon: <MdGeneratingTokens />,
      function: setOpenSendTransaction,
    },

    {
      name: "Buddy Token",
      icon: <MdGeneratingTokens />,
      function: setOpenSendTransaction,
    },
  ];
  return (
    <section id="tools" className="py-20">
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-medium capitalize text-white">
              Powerful Solana Tools
            </h2>

            <p className="text-default-200 text-sm font-medium">
              Discover a suite of powerful tools to help you create, manage, and
              deploy Solana tokens effortlessly. From token creation to
              airdrops, we have everything you need to succeed in the Solana
              ecosystem.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-default-950/40 rounded-xl backdrop-blur-3xl"
              onClick={() => tool.function(true)}
            >
              <div className="p-6">
                <div className="mb-4 flex items-center gap-5 ">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/20 ${
                      index == 0
                        ? "text-red-500"
                        : index == 1
                        ? "text-sky-500"
                        : index == 2
                        ? "text-indigo-500"
                        : index == 3
                        ? "text-yellow-500"
                        : "text-teal-500"
                    }`}
                  >
                    <i data-lucide="dribble" className="">
                      {tool.icon}
                    </i>
                  </div>

                  <h3 className="text-default-200 text-xl font-medium">
                    {tool.name}
                  </h3>
                </div>

                <a className="text-primary group relative inline-flex items-center gap-3">
                  <span className="bg-primary/80 absolute -bottom-0 h-px w-7/12 rounded transition-all duration-300 group-hover:w-full"></span>
                  Select and Try
                  <i data-lucide="arrow-right">
                    <LuArrowRight />
                  </i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a className="hover:bg-primary-hover bg-primary inline-flex items-center justify-center gap-3 rounded-full px-6 py-2 transition-all duration-300 text-white">
            More Tools
            <i>
              <IoIosArrowRoundForward />
            </i>
          </a>
        </div>
      </div>
    </section>
  );
};
