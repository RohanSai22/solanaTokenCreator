import React, { FC } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { AiOutlineClose } from "react-icons/ai";
import { notify } from "utils/notifications";

//INTERNAL IMPORTING
import Branding from "components/Branding";
import { set } from "immer/dist/internal";

interface ContactViewProps {
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContactView: FC<ContactViewProps> = ({ setOpenContact }) => {
  const [state, handleSubmit] = useForm("mzzezvew");

  if (state.succeeded) {
    notify({
      type: "success",
      message:
        "Thanks for submitting your message, we will get back to you soon",
    });
    setOpenContact(false);
  }

  //Component...
  const CloseModal = () => (
    <a
      className="group mt-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-300 hover:bg-blue-600/60"
      onClick={() => {
        setOpenContact(false);
      }}
    >
      <i className="text-2xl text-white group-hover:text-white">
        <AiOutlineClose />
      </i>
    </a>
  );

  return (
    <>
      {
        <section className="flex w-full items-center px-0 py-5 lg:h-screen lg:p-10">
          <div className="container">
            <div className="bg-default-950/40 mx-auto max-w-5xl rounded-3xl overflow-hidden backdrop-blur-2xl">
              <div className="grid gap-10 lg:grid-cols-2">
                {/*//FIRSTT SECTION*/}
                <Branding
                  image="auth-img"
                  title="To Build your Solana Token Creator"
                  message="Try out and Create your first ever Solana Project , and if you wisb to master Blockchain Development then check out my LinkedIn Group"
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
                      Mail Us for more details
                    </h4>
                    <p className="text-default-300 mx-auto mb-5 max-w-sm">
                      Put your message so that we can provide you with more
                      details
                    </p>

                    <div className="text-start">
                      <form onSubmit={handleSubmit} method="POST">
                        <div className="mb-4">
                          <label
                            htmlFor="email"
                            className="text-base/normal text-default-200 mb-2 block font-semibold"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className="border-default-200 block w-full rounded border-white/20 bg-transparent py-1.5 px-3 text-white/80 focus:border-white/25 focus:ring-transparent"
                            placeholder="Enter your email"
                            required
                          />
                        </div>

                        <ValidationError
                          prefix="Email"
                          field="email"
                          errors={state.errors}
                        />
                        <textarea
                          name="message"
                          placeholder="Enter your message"
                          id="message"
                          rows={6}
                          className="border-default-200 relative block w-full rounded border-white/20 bg-transparent py-1.5 px-3 text-white/80 focus:border-white/25 focus:ring-transparent"
                        />
                        <ValidationError
                          prefix="Message"
                          field="message"
                          errors={state.errors}
                        />

                        <div className="mb-6 text-center">
                          <button
                            type="submit"
                            disabled={state.submitting}
                            className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-300"
                          >
                            <span className="fw-bold">Send Message</span>
                          </button>

                          <CloseModal />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </>
  );
};
