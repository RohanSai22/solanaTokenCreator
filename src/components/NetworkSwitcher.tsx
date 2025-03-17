import { FC } from "react";
import dynamic from "next/dynamic";

// INTERNAL IMPORTING
import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";
import NetworkSwitcherSVG from "./SVG/NetworkSwitcherSVG";

const NetworkSwitcher: FC = () => {
  const { networkConfiguration, setNetworkConfiguration } =
    useNetworkConfiguration();

  return (
    <>
      <input
        type="checkbox"
        id="checkbox"
        className="rounded p-2 bg-slate-700 text-white"
      />
      <label className="switch">
        <select
          value={networkConfiguration}
          onChange={(e) => setNetworkConfiguration(e.target.value || "devnet")}
          className="select max-w-xs border-none bg-blue-500 text-white outline-0 p-2 rounded"
        >
          <option value="devnet" className="bg-slate-700 text-white p-2">
            Devnet
          </option>
          <option value="testnet" className="bg-slate-700 text-white p-2">
            Testnet
          </option>
          <option value="mainnet-beta" className="bg-slate-700 text-white p-2">
            Mainnet
          </option>
        </select>
      </label>
    </>
  );
};

export default dynamic(() => Promise.resolve(NetworkSwitcher), { ssr: false });
