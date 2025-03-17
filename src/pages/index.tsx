import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

//INTERNAL IMPORTING

import {
  HomeView,
  AirdropView,
  ContactView,
  CreateView,
  DonateView,
  FaqView,
  FeatureView,
  InputView,
  OfferView,
  TokenMetadata,
  ToolView,
} from "../views";

const Home: NextPage = (props) => {
  //STATE VARIABLES
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openTokenMetadata, setOpenTokenMetadata] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openAirdrop, setOpenAirdrop] = useState(false);
  const [openSendTransaction, setOpenSendTransaction] = useState(false);

  //FUNCTIONS
  return (
    <>
      <Head>
        <title>Solana Token Creator</title>

        <meta
          name="description"
          content="Create and manage Solana tokens easily with our user-friendly platform.  Mint, deploy, and track your tokens with simple tools, ideal for developers and businesses."
        />
        <meta
          name="keywords"
          content="Solana, token, creator, mint, blockchain, NFT, cryptocurrency, web3, Solana tokens"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HomeView setOpenCreateModal={setOpenCreateModal} />
      <ToolView
        setOpenAirdrop={setOpenAirdrop}
        setOpenContact={setOpenContact}
        setOpenTokenMetadata={setOpenTokenMetadata}
        setOpenCreateModal={setOpenCreateModal}
        setOpenSendTransaction={setOpenSendTransaction}
      />

      <FeatureView
        setOpenAirdrop={setOpenAirdrop}
        setOpenContact={setOpenContact}
        setOpenTokenMetadata={setOpenTokenMetadata}
        setOpenCreateModal={setOpenCreateModal}
        setOpenSendTransaction={setOpenSendTransaction}
      />

      <OfferView />

      <FaqView />

      {/*DYNAMIC COMPONENTS*/}

      {openCreateModal && (
        <div className="new_loader relative h-full bg-slate-900">
          <CreateView setOpenCreateModal={setOpenCreateModal} />
        </div>
      )}

      {openTokenMetadata && (
        <div className="new_loader relative h-full bg-slate-900">
          <TokenMetadata setOpenTokenMetaData={setOpenTokenMetadata} />
        </div>
      )}

      {openContact && (
        <div className="new_loader relative h-full bg-slate-900">
          <ContactView setOpenContact={setOpenContact} />
        </div>
      )}

      {openAirdrop && (
        <div className="new_loader relative h-full bg-slate-900">
          <AirdropView setOpenAirdrop={setOpenAirdrop} />
        </div>
      )}

      {openSendTransaction && (
        <div className="new_loader relative h-full bg-slate-900">
          <DonateView setOpenSendTransaction={setOpenSendTransaction} />
        </div>
      )}
    </>
  );
};

export default Home;
