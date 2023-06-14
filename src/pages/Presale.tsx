import React, { ChangeEvent, useEffect, useState } from "react";
import { useSigner } from "wagmi";
import { getTokenAmountPerUSDT } from "../utils/Presale";
import { useBuyToken } from "../hooks/useBuyToken";
import { ethers } from "ethers";
import "./Presale.css";

const Presale = () => {
  const { data: signer } = useSigner();
  const staticProvider = new ethers.providers.StaticJsonRpcProvider('https://bsc-dataseed1.defibit.io');

  const floorTokenAmount = 0.01;
  const [tokenAmountPerUSDT, setTokenAmountPerUSDT] = useState(0);
  const [USDTAmount, setUSDTAmount] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [USDTStatus, setUSDTStatus] = useState("");
  const [connectStatus, setConnectStatus] = useState("");
  
  const {send: buyNMDToken, state: buyTransactionState} = useBuyToken();

  const buyUSDTValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUSDTAmount(parseFloat(evt.target.value));
    setTokenAmount(parseFloat(evt.target.value) * tokenAmountPerUSDT);
  };

  const loadBalance = async () => {
    if (staticProvider) {
      setTokenAmountPerUSDT(await getTokenAmountPerUSDT(staticProvider));
    } else {
      setTokenAmountPerUSDT(0);
    }
  };

  useEffect(() => {
    loadBalance();
  }, [staticProvider]);

  useEffect(() => {
    if (USDTAmount < floorTokenAmount)
      setUSDTStatus(`USDT Amount should be over ${floorTokenAmount}`);
    else setUSDTStatus("");
  }, [USDTAmount]);

  const handleBuyPressed = async () => {
    if (!signer) {
      setConnectStatus("Connect Wallet!");
      return;
    } 
    if (!USDTAmount || USDTAmount < floorTokenAmount) {
        return;
    }
    setConnectStatus("");
    await buyNMDToken(USDTAmount, signer);
  };

  return (
    <div className="bg-gray-900 w-full sm:w-1/2 lg:w-1/3 py-5 px-4 sm:px-5 rounded-lg text-gray-200 font-sans mx-3">
      <div className="border-b border-white p-4 sm:p-5">
        <h4 className="text-xl sm:text-2xl font-medium">Buy NMD Token</h4>
        <p className="text-sm sm:text-base">Minimum Purchase {floorTokenAmount} USDT ({floorTokenAmount * tokenAmountPerUSDT} NMD)</p>
      </div>
      <div className="p-4 sm:p-5">
        <div className="mb-4 bg-black rounded-lg p-3">
          <p className="py-2 sm:py-3 text-sm sm:text-base">Enter USDT Value to purchase:</p>
          <input
            type="number"
            placeholder="0"
            onChange={buyUSDTValueChange}
            value={USDTAmount}
            className="bg-gray-800 py-2 px-3 text-white appearance-none text-sm sm:text-base"
          />
          <p className="text-red-500 py-2 sm:py-3 text-sm sm:text-base">{USDTStatus}</p>
        </div>
        <div className="mb-4 bg-black rounded-lg p-3">
          <p className="text-sm sm:text-base">NMD Amount: <span className="text-[#ff7500]">{tokenAmount || 0} NMD</span></p>
        </div>
        <div>
          <button
            type="button"
            value="Buy NMD Token"
            className="py-2 px-4 rounded-lg bg-orange-500 hover:bg-blue-700 text-sm sm:text-base cursor-pointer"
            onClick={handleBuyPressed}
            disabled={buyTransactionState?.status === 'Pending'}
          >
            Buy NMD Token
          </button>
          {
            !signer && (
              <p className="text-red-500 py-2 sm:py-3 text-sm sm:text-base">{connectStatus}</p>
            )
          }
          {
            buyTransactionState?.status === 'Failed' && (
              <p className="text-red-500 py-2 sm:py-3 text-sm sm:text-base">{buyTransactionState.errMsg}</p>
            )
          }
          {
            buyTransactionState?.status === 'Success' && (
              <p className="text-green-500 py-2 sm:py-3 text-sm sm:text-base">Transaction successful</p>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Presale;
