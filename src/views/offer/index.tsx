import React, { FC } from "react";
import { LuArrowRightCircle } from "react-icons/lu";

export const OfferView: FC = () => {
  return (
    <section id="features" className="py-20">
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-medium capitalize text-white">
              Solana Token Popularity
            </h2>
            <p className="text-default-200 text-sm font-medium">
              Discover the most popular tools and features for creating and
              managing Solana tokens. Our platform offers a comprehensive suite
              of tools to help you succeed in the Solana ecosystem.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3 space-y-6">
          {/* FIRST SECTION */}
          <div className="bg-default-950/40 hover:-translate-y-2 border-s-2 border-primary rounded-xl backdrop-blur-3xl transition-all duration-300">
            <div className="p-11">
              <i className="text-primary h-10 w-10">
                <LuArrowRightCircle />
              </i>
              <h3 className="mb-4 mt-8 text-2xl font-medium text-white">
                Best Token Builder
              </h3>

              <p className="text-default-100 mb-4 text-sm font-medium">
                Create your own Solana token effortlessly with our intuitive
                token builder. No coding required!
              </p>

              <a
                href="https://spl.solana.com/token"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary group relative inline-flex items-center gap-2"
              >
                <span className="bg-primary/80 absolute -bottom-0 h-px w-7/12 rounded transition-all duration-300 group-hover:w-full"></span>
                Read More...
                <i className="ml-2">
                  <LuArrowRightCircle />
                </i>
              </a>
            </div>
          </div>

          {/* SECOND SECTION */}
          <div className="bg-default-950/40 hover:-translate-y-2 border-s-2 border-primary rounded-xl backdrop-blur-3xl transition-all duration-300">
            <div className="p-11">
              <i className="text-primary h-10 w-10">
                <LuArrowRightCircle />
              </i>
              <h3 className="mb-4 mt-8 text-2xl font-medium text-white">
                Token Metadata Management
              </h3>

              <p className="text-default-100 mb-4 text-sm font-medium">
                Manage your token metadata with ease. Update token details,
                images, and more.
              </p>

              <a
                href="https://docs.metaplex.com/token-metadata"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary group relative inline-flex items-center gap-2"
              >
                <span className="bg-primary/80 absolute -bottom-0 h-px w-7/12 rounded transition-all duration-300 group-hover:w-full"></span>
                Read More...
                <i className="ml-2">
                  <LuArrowRightCircle />
                </i>
              </a>
            </div>
          </div>

          {/* THIRD SECTION */}
          <div className="bg-default-950/40 hover:-translate-y-2 border-s-2 border-primary rounded-xl backdrop-blur-3xl transition-all duration-300">
            <div className="p-11">
              <i className="text-primary h-10 w-10">
                <LuArrowRightCircle />
              </i>
              <h3 className="mb-4 mt-8 text-2xl font-medium text-white">
                Join The Community
              </h3>

              <p className="text-default-100 mb-4 text-sm font-medium">
                Join in the best community of all and meet exciting people.
              </p>

              <a
                href="https://solana.com/community"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary group relative inline-flex items-center gap-2"
              >
                <span className="bg-primary/80 absolute -bottom-0 h-px w-7/12 rounded transition-all duration-300 group-hover:w-full"></span>
                Read More...
                <i className="ml-2">
                  <LuArrowRightCircle />
                </i>
              </a>
            </div>
          </div>

          {/* FOURTH SECTION */}
          <div className="bg-default-950/40 hover:-translate-y-2 border-s-2 border-primary rounded-xl backdrop-blur-3xl transition-all duration-300">
            <div className="p-11">
              <i className="text-primary h-10 w-10">
                <LuArrowRightCircle />
              </i>
              <h3 className="mb-4 mt-8 text-2xl font-medium text-white">
                Airdrop Tokens
              </h3>

              <p className="text-default-100 mb-4 text-sm font-medium">
                Distribute your tokens to a wide audience with our airdrop
                feature.
              </p>

              <a
                href="https://docs.solana.com/cli/usage#airdrop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary group relative inline-flex items-center gap-2"
              >
                <span className="bg-primary/80 absolute -bottom-0 h-px w-7/12 rounded transition-all duration-300 group-hover:w-full"></span>
                Read More...
                <i className="ml-2">
                  <LuArrowRightCircle />
                </i>
              </a>
            </div>
          </div>

          {/* FIFTH SECTION */}
          <div className="bg-default-950/40 hover:-translate-y-2 border-s-2 border-primary rounded-xl backdrop-blur-3xl transition-all duration-300">
            <div className="p-11">
              <i className="text-primary h-10 w-10">
                <LuArrowRightCircle />
              </i>
              <h3 className="mb-4 mt-8 text-2xl font-medium text-white">
                Send Transactions
              </h3>

              <p className="text-default-100 mb-4 text-sm font-medium">
                Easily send transactions on the Solana network with our
                user-friendly interface.
              </p>

              <a
                href="https://docs.solana.com/developing/programming-model/transactions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary group relative inline-flex items-center gap-2"
              >
                <span className="bg-primary/80 absolute -bottom-0 h-px w-7/12 rounded transition-all duration-300 group-hover:w-full"></span>
                Read More...
                <i className="ml-2">
                  <LuArrowRightCircle />
                </i>
              </a>
            </div>
          </div>

          {/* SIXTH SECTION */}
          <div className="bg-default-950/40 hover:-translate-y-2 border-s-2 border-primary rounded-xl backdrop-blur-3xl transition-all duration-300">
            <div className="p-11">
              <i className="text-primary h-10 w-10">
                <LuArrowRightCircle />
              </i>
              <h3 className="mb-4 mt-8 text-2xl font-medium text-white">
                Explore Solana
              </h3>

              <p className="text-default-100 mb-4 text-sm font-medium">
                Explore the Solana blockchain and discover new opportunities.
              </p>

              <a
                href="https://jobs.solana.com/jobs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary group relative inline-flex items-center gap-2"
              >
                <span className="bg-primary/80 absolute -bottom-0 h-px w-7/12 rounded transition-all duration-300 group-hover:w-full"></span>
                Read More...
                <i className="ml-2">
                  <LuArrowRightCircle />
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
