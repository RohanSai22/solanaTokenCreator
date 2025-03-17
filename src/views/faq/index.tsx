import { FC, useState } from "react";

export const FaqView: FC = ({}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const questions = [
    {
      question: "What is a Solana Token Creator Dapp?",
      answer:
        "A Solana Token Creator Dapp is a decentralized application built on the Solana blockchain that allows users to create and deploy their own SPL (Solana Program Library) tokens without needing to write complex smart contracts.",
      id: "faq-1",
    },
    {
      question: "What can I create with this Dapp?",
      answer:
        "You can create and deploy your own custom SPL tokens. These tokens can represent anything you want, such as a new cryptocurrency, loyalty points, in-game assets, or community membership passes.",
      id: "faq-2",
    },
    {
      question: "What are the technologies used to build this Dapp?",
      answer:
        "This Dapp is built using TypeScript, Next.js for the frontend, Tailwind CSS for styling, and the Solana SDK for interacting with the Solana blockchain. NestJS can also be used for server-side functionality.",
      id: "faq-3",
    },
    {
      question: "Can I deploy my tokens on the Solana Mainnet?",
      answer:
        "Yes, you can deploy your tokens on both the Solana Mainnet and Devnet. The Dapp supports both environments, allowing you to test on Devnet and then launch on Mainnet.",
      id: "faq-4",
    },
    {
      question: "Is this Token Creator Dapp fully decentralized?",
      answer:
        "Yes, the Solana Token Creator Dapp is designed to be 100% decentralized. Token creation and deployment are done directly on the Solana blockchain without reliance on any central authority.",
      id: "faq-5",
    },
    {
      question: "Do I need prior coding experience to use this Dapp?",
      answer:
        "While you don't need to write code to create tokens, the source code is provided for those who want to understand the inner workings or customize the Dapp. Familiarity with blockchain and cryptocurrencies is helpful.",
      id: "faq-6",
    },
    {
      question: "What is SPL token ?",
      answer:
        "SPL stands for Solana Program Library. SPL tokens are like ERC-20 tokens on Ethereum, it is the token standard on the solana blockchain",
      id: "faq-7",
    },
    {
      question: "What is Solana Devnet?",
      answer:
        "The Solana Devnet is a development network for testing and experimenting with dApps before deploying them to the main network. It's a place where developers can deploy and test their dApps without worrying about real funds.",
      id: "faq-8",
    },
    {
      question: "What is Solana Mainnet ?",
      answer:
        "Solana Mainnet is the live, fully operational network of the Solana blockchain, where real transactions take place using SOL.",
      id: "faq-9",
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20">
      <div className="container">
        <div className="mb-10 flex items-center justify-between">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-medium capitalize text-white">
              Have Any Questions?
            </h2>
            <p className="text-default-200 text-sm font-medium">
              Find answers to the most frequently asked questions about creating
              and managing Solana tokens. If you have any other questions, feel
              free to reach out to our support team.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="hs-accordion-group space-y-4">
            {questions.map((question, index) => (
              <div
                key={index}
                className={`hs-accordion bg-default-950/40 overflow-hidden rounded-lg border border-white/10 backdrop-blur-3xl`}
                id={question.id}
              >
                <button
                  className="hs-accordion-toggle inline-flex items-center justify-between px-6 py-4 gap-x-3 text-left capitalize text-white transition-all duration-300"
                  aria-controls={`faq-accordion-${index + 1}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <h5 className="flex text-base font-semibold">
                    <i className="me-3 h-5 w-5 stroke-white align-middle"></i>
                    {question.question}
                  </h5>
                  <i
                    className={`hs-accordion-active:rotate-180 h-4 w-4 transition-all duration-300 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  ></i>
                </button>

                <div
                  id={`faq-accordion-${index + 1}`}
                  className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300  cursor-pointer ${
                    activeIndex === index ? "max-h-screen" : "max-h-0"
                  }`}
                  aria-labelledby={question.id}
                >
                  <div className="px-6 pb-4 pt-0">
                    <p className="text-default-300 mb-3 text-sm font-medium">
                      {question.answer}
                    </p>

                    <p className="text-default-300 text-sm font-medium">
                      Ever wanted to become a Blockchain Developer, then check
                      out the{" "}
                      <a
                        href="https://www.linkedin.com/groups/14579465/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        LinkedIn Group
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
