import React, { FC, useCallback, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from "@solana/spl-token";

import {
  PROGRAM_ID,
  createCreateMetadataAccountInstruction,
  createCreateMetadataAccountV3Instruction,
} from "@metaplex-foundation/mpl-token-metadata";

import axios from "axios";
import { notify } from "../../utils/notifications";
import { ClipLoader } from "react-spinners";
import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";

//UI IMPORTING
import { AiOutlineClose } from "react-icons/ai";
import CreateSVG from "../../components/SVG/CreateSVG";
import Branding from "components/Branding";
import { InputView } from "views";
import { set } from "immer/dist/internal";

//INTERNAL IMPORTING

export const CreateView: FC<{
  setOpenCreateModal: (open: boolean) => void;
}> = ({ setOpenCreateModal }) => {
  //export const CreateView: FC = ({ setOpenCreateModal }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { networkConfiguration } = useNetworkConfiguration();

  const [tokenUri, setTokenUri] = useState("");
  const [tokenMintAddress, setTokenMintAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionConfirmed, setTransactionConfirmed] = useState(false); // New state

  const [token, setToken] = useState({
    name: "",
    symbol: "",
    decimals: "",
    amount: "",
    image: "",
    description: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setToken({ ...token, [fieldName]: e.target.value });
  };

  //CREATING TOKEN FUNCTION

  const createToken = useCallback(
    async (token) => {
      setIsLoading(true); // Start loading
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const mintKeypair = Keypair.generate();
      const tokenATA = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        publicKey
      );

      try {
        const metadataUrl = await uploadMetadata(token);
        if (!metadataUrl) {
          console.log("Failed to upload metadata");
          throw new Error("Failed to upload metadata");
        }
        console.log(metadataUrl);

        const createMetadataInstruction =
          createCreateMetadataAccountV3Instruction(
            {
              metadata: PublicKey.findProgramAddressSync(
                [
                  Buffer.from("metadata"),
                  PROGRAM_ID.toBuffer(),
                  mintKeypair.publicKey.toBuffer(),
                ],
                PROGRAM_ID
              )[0],
              mint: mintKeypair.publicKey,
              mintAuthority: publicKey,
              payer: publicKey,
              updateAuthority: publicKey,
            },
            {
              createMetadataAccountArgsV3: {
                data: {
                  name: token.name,
                  symbol: token.symbol,
                  uri: metadataUrl,
                  sellerFeeBasisPoints: 0,
                  creators: null,
                  collection: null,
                  uses: null,
                },
                isMutable: false,
                collectionDetails: null,
              },
            }
          );

        const createNewTokenTransaction = new Transaction().add(
          SystemProgram.createAccount({
            fromPubkey: publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: MINT_SIZE,
            lamports: lamports,
            programId: TOKEN_PROGRAM_ID,
          }),
          createInitializeMintInstruction(
            mintKeypair.publicKey,
            Number(token.decimals),
            publicKey,
            publicKey,
            TOKEN_PROGRAM_ID
          ),
          createAssociatedTokenAccountInstruction(
            publicKey,
            tokenATA,
            publicKey,
            mintKeypair.publicKey
          ),

          createMintToInstruction(
            mintKeypair.publicKey,
            tokenATA,
            publicKey,
            Number(token.amount) * 10 ** Number(token.decimals)
          ),
          createMetadataInstruction
        );

        const signature = await sendTransaction(
          createNewTokenTransaction,
          connection,
          {
            signers: [mintKeypair],
            skipPreflight: false,
            preflightCommitment: "confirmed",
            maxRetries: 3,
          }
        );

        setTokenMintAddress(mintKeypair.publicKey.toString());
        notify({
          type: "success",
          message: "Token created successfully",
          txid: signature,
        });
        console.log(tokenMintAddress);
        console.log(signature);
        setTransactionConfirmed(true); // Set transaction confirmed
      } catch (err: any) {
        notify({
          type: "error",
          message: "Token creation failed, try again",
        });
      }
      setIsLoading(false); // Stop loading
    },
    [publicKey, connection, sendTransaction]
  );

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const imgUrl = await uploadImagePinata(file);
      setToken({ ...token, image: imgUrl });
    }
  };

  const uploadImagePinata = async (file) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: "6281368fba9aefef2186",
            pinata_secret_api_key:
              "ab53da6c3dc95954303b93bd65021ebea543fa65f1f807141affb42a27e8ab4e",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        console.log(ImgHash);
        return ImgHash;
      } catch (err: any) {
        notify({ type: "error", message: "Upload to Pinata has failed" });
      }
      setIsLoading(false);
    }
  };

  //META DATA

  const uploadMetadata = async (token) => {
    setIsLoading(true);

    const { name, symbol, image, description } = token;
    if (!name || !symbol || !description || !image) {
      notify({
        type: "error",
        message: "Data is missing...",
      });
      setIsLoading(false);
      return null;
    }

    const data = JSON.stringify({
      name,
      symbol,
      description,
      image,
    });

    try {
      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: "6281368fba9aefef2186",
          pinata_secret_api_key:
            "ab53da6c3dc95954303b93bd65021ebea543fa65f1f807141affb42a27e8ab4e",
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      console.log(response);
      console.log(url);
      setIsLoading(false);
      return url;
    } catch (err: any) {
      notify({ type: "error", message: "Upload to Pinata JSON has failed" });
      setIsLoading(false);
      return null;
    }
  };

  return (
    <>
      {isLoading && (
        <div className="absolute top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black/[.3] backdrop-blur-[10px]">
          <ClipLoader />
        </div>
      )}

      {tokenMintAddress ? (
        <section className="flex w-full items-center px-0 py-5 lg:h-screen lg:p-10">
          <div className="container">
            <div className="bg-default-950/40 mx-auto max-w-5xl rounded-3xl overflow-hidden backdrop-blur-2xl">
              <div className="grid gap-10 lg:grid-cols-2">
                {/*//FIRST SECTION*/}
                <Branding
                  image="auth-img"
                  title="To Build your Solana Token Creator"
                  message="Try out and Create your first ever Solana Project, and if you wish to master Blockchain Development then check out my LinkedIn Group"
                />

                {/*//SECOND SECTION*/}
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
                      Link Your New Token
                    </h4>
                    <p className="text-default-300 mx-auto mb-5 max-w-sm">
                      Your Solana Token has been successfully created.
                      <br />
                      Check the Explorer now...
                    </p>

                    <div className="flex items-center justify-center">
                      <img
                        src={token.image || "assets/images/logo1.png"}
                        alt="Logo"
                        className="h-40"
                      />
                    </div>

                    <div className="mt-5 w-full text-center">
                      <p className="text-default-300 text-base font-medium leading-6">
                        <InputView
                          name="Token Address"
                          placeholder={tokenMintAddress}
                          clickhandle={() => {}}
                        />
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(tokenMintAddress);
                          }}
                        >
                          Copy
                        </span>
                      </p>

                      <div className="mb-6 text-center ">
                        <a
                          href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-300"
                        >
                          <span className="fw-bold">View On Solana</span>
                        </a>
                      </div>

                      <div>
                        <div className="text-center">
                          <ul className="flex items-center justify-center gap-4 flex-wrap">
                            <li>
                              <a
                                onClick={() => setOpenCreateModal(false)}
                                className="group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-300 hover:bg-blue-600/60"
                              >
                                <i className="text-2xl text-white group:hover:text-white">
                                  <AiOutlineClose />
                                </i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex w-full items-center px-0 py-5 lg:h-screen lg:p-10">
          <div className="container">
            <div className="bg-default-950/40 mx-auto max-w-5xl rounded-3xl overflow-hidden backdrop-blur-2xl">
              <div className="grid gap-10 lg:grid-cols-2 mt-10">
                <div className="ps-4 px-4 hidden py-4 pt-10 lg:block">
                  <div className="upload relative w-full overflow-hidden rounded">
                    {token.image ? (
                      <img
                        src={token.image}
                        alt="Token Image"
                        className="w-2/5"
                      />
                    ) : (
                      <label htmlFor="file" className="custum-file-upload">
                        <div className="icon">
                          <CreateSVG />
                        </div>
                        <div className="text">
                          <span>Upload Image</span>
                        </div>
                        <input
                          type="file"
                          id="file"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>

                  <textarea
                    rows={6}
                    onChange={(e) => handleFormFieldChange("description", e)}
                    className="relative border-default-200 mt-48 block w-full rounded bg-transparent border-white py-1.5 px-3 text-white/80 focus:border-white/25 focus:ring-transparent"
                    placeholder="Description of the token"
                  ></textarea>
                </div>

                <div className="lg:ps-0 flex flex-col p-10">
                  <div className="pb-6 my-auto">
                    <h4 className="mb-4 text-2xl font-bold text-white">
                      Solana Token Creator
                    </h4>
                    <p className="text-default-300 mb-8 max-w-sm">
                      Kindly Please Ensure to provide all the details about your
                      token as required.
                    </p>

                    <div className="text-start">
                      <InputView
                        name="Name"
                        placeholder="name"
                        clickhandle={(e) => handleFormFieldChange("name", e)}
                      />
                      <InputView
                        name="Symbol"
                        placeholder="symbol"
                        clickhandle={(e) => handleFormFieldChange("symbol", e)}
                      />
                      <InputView
                        name="Decimals"
                        placeholder="decimals"
                        clickhandle={(e) =>
                          handleFormFieldChange("decimals", e)
                        }
                      />
                      <InputView
                        name="Amount"
                        placeholder="amount"
                        clickhandle={(e) => handleFormFieldChange("amount", e)}
                      />

                      <div className="mb-6 text-center">
                        <button
                          onClick={() => createToken(token)}
                          className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full rounded-lg px-6 py-3 text-white backdrop-blur-2xl justify-center items-center transition-all duration-300"
                          type="submit"
                        >
                          <span className="fw-bold">Create Token</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-center">
                      <ul className="flex items-center justify-center gap-4 flex-wrap">
                        <li>
                          <a
                            onClick={() => setOpenCreateModal(false)}
                            className="group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-300 hover:bg-blue-600/60"
                          >
                            <i className="text-2xl text-white group:hover:text-white">
                              <AiOutlineClose />
                            </i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

/*

<div className="grid gap-10 lg:grid-cols-2 mt-10">
                <div className="ps-4 px-4 hidden py-4 pt-10 lg:block">
                  <div className="upload relative w-full overflow-hidden rounded">
                    {token.image ? (
                      <img
                        src={token.image}
                        alt="Token Image"
                        className="w-2/5"
                      />
                    ) : (
                      <label htmlFor="file" className="custum-file-upload">
                        <div className="icon">
                          <CreateSVG />
                        </div>
                        <div className="text">
                          <span>Upload Image</span>
                        </div>
                        <input
                          type="file"
                          id="file"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>

                  <textarea
                    rows={6}
                    onChange={(e) => handleFormFieldChange("description", e)}
                    className="relative border-default-200 mt-48 block w-full rounded bg-transparent border-white py-1.5 px-3 text-white/80 focus:border-white/25 focus:ring-transparent"
                    placeholder="Description of the token"
                  ></textarea>
                </div>

                <div className="lg:ps-0 flex flex-col p-10">
                  <div className="pb-6 my-auto">
                    <h4 className="mb-4 text-2xl font-bold text-white">
                      Solana Token Creator
                    </h4>
                    <p className="text-default-300 mb-8 max-w-sm">
                      {" "}
                      Kindly Please Ensure to provide all the details about your
                      token as required.
                    </p>

                    <div className="text-start">
                      <InputView
                        name="Name"
                        placeholder="name"
                        clickhandle={(e) => handleFormFieldChange("name", e)}
                      />
                      <InputView
                        name="Symbol"
                        placeholder="symbol"
                        clickhandle={(e) => handleFormFieldChange("symbol", e)}
                      />
                      <InputView
                        name="Decimals"
                        placeholder="decimals"
                        clickhandle={(e) =>
                          handleFormFieldChange("decimals", e)
                        }
                      />
                      <InputView
                        name="Amount"
                        placeholder="amount"
                        clickhandle={(e) => handleFormFieldChange("amount", e)}
                      />

                      <div className="mb-6 text-center">
                        <button
                          onClick={() => createToken(token)}
                          className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full rounded-lg px-6 py-3 text-white backdrop-blur-2xl justify-center items-center transition-all duration-300"
                          type="submit"
                        >
                          <span className="fw-bold">Create Token</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-center">
                      <ul className="flex items-center justify-center gap-4 flex-wrap">
                        <li>
                          <a
                            onClick={() => setOpenCreateModal(false)}
                            className="group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-300 hover:bg-blue-600/60"
                          >
                            <i className="text-2xl text-white group:hover:text-white">
                              <AiOutlineClose />
                            </i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
 */
