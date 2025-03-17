import React, { FC } from "react";

export const InputView: FC = ({ placeholder, name, clickhandle }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="input-label"
        className="text-base/normal text-default-200 mb-3 block font-semibold"
      >
        {name}
      </label>
      <input
        type="text"
        onChange={clickhandle}
        placeholder={placeholder}
        className="border-default-200 block w-full rounded border-white/10 bg-transparent py-1.5 text-white/80 focus:border-white/25 focus:ring-transparent"
      />
    </div>
  );
};
