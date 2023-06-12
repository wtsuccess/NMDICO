import React, { ChangeEvent, useEffect, useState } from "react";
import { useSigner } from "wagmi";
import { buyNMDToken, getTokenAmountPerUSDT } from "../utils/Presale";
import { ethers } from "ethers";
import "./Presale.css";

const Presale = () => {
  const { data: signer } = useSigner();
  const staticProvider = new ethers.providers.StaticJsonRpcProvider('https://bsc-dataseed1.defibit.io');

  const floorTokenAmount = 10;

  const [tokenAmountPerUSDT, setTokenAmountPerUSDT] = useState(0);

  const [USDTAmount, setUSDTAmount] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [USDTStatus, setUSDTStatus] = useState("");

  const buyUSDTValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUSDTAmount(parseFloat(evt.target.value));
    setTokenAmount(parseFloat(evt.target.value) * tokenAmountPerUSDT);
  };

  const loadBalance = async () => {
    if (staticProvider) {
      setTokenAmountPerUSDT(await getTokenAmountPerUSDT(staticProvider));
      console.log(tokenAmountPerUSDT);
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
    if (signer) {
        if (USDTAmount < floorTokenAmount) {
            console.log(`USDT Amount should be over ${floorTokenAmount}`);
            return;
        }
      await buyNMDToken(USDTAmount, signer);
    } else {
      console.log("Connect Wallet!");
    }
  };

  return (
    <div className="bg-gray-900 mx-auto w-1/2 py-5 px-5 rounded-lg text-gray-200 font-sans">
        <div className="border-b border-white p-5">
            <h4 className="text-2xl font-medium">Buy NMD Token</h4>
            <p>Minimum Purchase {floorTokenAmount} USDT ({floorTokenAmount * tokenAmountPerUSDT} NMD)</p>
        </div>
        <div className="p-5">
            <div className="mb-5 bg-black rounded-lg p-3">
              <p className="py-3">Enter USDT Value to purchase</p>
              <input
                  type="number"
                  placeholder="0"
                  onChange={buyUSDTValueChange}
                  value={USDTAmount}
                  className="bg-gray-800 py-2 px-3 text-white appearance-none"
              />
              <p className="text-red-500 py-3">{USDTStatus}</p>
            </div>
            <div className="mb-5 bg-black rounded-lg p-3">
              <p>NMD Amount : <span className="text-[#ff7500]">{tokenAmount || 0} NMD</span></p>
            </div>
            <div>
              <input
                  type="button"
                  value="Buy NMD Token"
                  className="py-3 px-5 rounded-lg bg-orange-500 hover:bg-blue-700 text-sm cursor-pointer"
                  onClick={handleBuyPressed}
              />
            </div>
        </div>
    </div>
  );
};

export default Presale;
