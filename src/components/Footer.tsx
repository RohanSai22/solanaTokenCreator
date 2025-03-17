import React, { FC } from "react";
import { useForm } from "@formspree/react";
import {
  TiSocialTwitter,
  TiSocialLinkedin,
  TiSocialYoutube,
} from "react-icons/ti";

export const Footer: FC = () => {
  const [state, handleSubmit] = useForm("mzzezvew");

  const menuOne = [
    "Support Center",
    "Customer Support",
    "About Us",
    "Project",
    "Return Policy",
  ];
  const menuTwo = [
    "Press Inquiries",
    "Social Media Support",
    "Image & B-roll ",
    "Site Map",
    "Terms & Conditions",
  ];

  return (
    <footer className="bg-default-950/40 backdrop-blur-3xl">
      <div className="container py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <ul className="flex flex-col gap-5">
              <h5 className="text-default-200 mb-2 font-medium lg:text-lg xl:text-xl">
                About Us
              </h5>
              {menuOne.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-default-300 text-base transition-all hover:text-white"
                  >
                    <i
                      data-lucide="gauge-circle"
                      className="me-2 inline-block h-5 w-5 "
                    ></i>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <ul className="flex flex-col gap-5">
              <h5 className="text-default-200 mb-2 font-medium lg:text-lg xl:text-xl">
                My Account
              </h5>
              {menuTwo.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-default-300 text-base transition-all hover:text-white"
                  >
                    <i
                      data-lucide="gauge-circle"
                      className="me-2 inline-block h-5 w-5 "
                    ></i>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-6">
            <div className="bg-primary/20 rounded-xl">
              <div className="p-10">
                <h6 className="mb-4 text-xl text-white">Newsletter</h6>
                <p className="text-default-200 mb-5 text-base font-medium">
                  Sign up and receive the latest updates
                </p>
                <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                  <label htmlFor="email" className="text-base text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="bg-default-950/60 pe-40 ps-4 h-12 w-full rounded-lg border-white/10 py-4 text-white backdrop-blur-3xl focus:border-white/10 focus-ring-0"
                    />
                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="hover:bg-primary-hover hover:border-primary-hover border-primary bg-primary end-[6px] absolute top-[6px] inline-flex h-10 items-center justify-center gap-2 rounded-md px-6 text-white transition-all"
                    >
                      Subscribe
                    </button>
                  </div>
                  {state.succeeded && (
                    <p className="mt-4 text-sm text-green-500">
                      Thank you for showing interest in our newsletter!
                    </p>
                  )}
                </form>

                <div>
                  <h6 className="mb-4 text-base text-white">Follow Us</h6>
                  <ul className="flex flex-wrap items-center gap-1">
                    <li>
                      <a
                        href="https://x.com/RohanSai2208"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:bg-primary group inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 transition-all duration-500"
                      >
                        <i className="text-default-300 group-hover:text-white">
                          <TiSocialTwitter />
                        </i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/rohan-sai-446a02228"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:bg-primary group inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 transition-all duration-500"
                      >
                        <i className="text-default-300 group-hover:text-white">
                          <TiSocialLinkedin />
                        </i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youtube.com/@rc_381"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:bg-primary group inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 transition-all duration-500"
                      >
                        <i className="text-default-300 group-hover:text-white">
                          <TiSocialYoutube />
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

      {/* CopyRight Section */}
      <div className="border-t border-white/10 py-6">
        <div className="md:text-start container flex h-full flex-wrap items-center justify-center gap-4 text-center md:justify-between lg:px-20">
          <p className="text-default-400 text-base font-medium">
            @ SolAI -
            <a href="#">
              Designed & Created{" "}
              <i
                data-lucide="heart"
                className="inline h-4 w-4 fill-red-500 text-red-500"
              ></i>
              by @Solanacoderz
            </a>
          </p>
          <p className="text-default-400 text-base font-medium">
            Terms, Conditions & Policies
          </p>
        </div>
      </div>
    </footer>
  );
};
