import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";

import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // connnecting with smart contract
  const { contract } = useContract(
    "0x8E7E149C506Cc26C41C744F18CB135Ec79d12C8f"
  );

  const { mutateAsync: createCamp } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  // taking data from form and writing into smart contract
  const publicCampaign = async (form) => {
    try {
      const data = await createCamp([
        address, //owner
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);
      console.log(`contract call sucesss`, data);
    } catch (error) {
      console.log(`contract call failed`, error);
    }
  };

  return (
    <StateContext.Provider
      value={{ address, contract, connect, createCamp: publicCampaign }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
