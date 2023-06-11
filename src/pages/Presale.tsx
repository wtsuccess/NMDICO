import React, { ChangeEvent, useEffect, useState } from "react";
import { useSigner } from "wagmi";
import { buyNMDToken, getTokenAmountPerUSDT } from "../utils/Presale";
import { ethers } from "ethers";

const Presale = () => {
  const { data: signer } = useSigner();
  const staticProvider = new ethers.providers.StaticJsonRpcProvider('https://bsc-dataseed1.binance.org/');

  const floorTokenAmount = 0.0001;

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
    <div className="text-white bg-[#0d0d0d] mx-auto w-1/2 py-5 px-5 rounded-[24px]">
      <div className="border-b-white">
        <h4 className="font-[500] text-[20px]">Buy NMD Token</h4>
        <p>
          Minimum Purchase {floorTokenAmount} USDT (
          {floorTokenAmount * tokenAmountPerUSDT} NMD)
        </p>
      </div>
      <div className="p-5">
        <div className="p-[15px] mb-[10px] bg-black rounded-[10px]">
          <p>Enter USDT Value to purchase</p>
          <input
            type="number"
            placeholder="0"
            onChange={buyUSDTValueChange}
            value={USDTAmount}
            className="bg-zinc-800 " 
          />
          <p className="text-[#fa1111]">{USDTStatus}</p>
        </div>
        <div className="p-[15px] mb-10 bg-black rounded-[10px]">
          <p>
            NMD Amount :{" "}
            <span className="text-orange">{tokenAmount || 0} NMD</span>
          </p>
        </div>
        <div>
          <input
            type="button"
            value="Buy NMD Token"
            className="rounded-lg bg-[#ff7500] py-5 px-5 cursor-pointer hover:bg-sky-700"
            onClick={handleBuyPressed}
          />
        </div>
      </div>
    </div>
  );
};

export default Presale;
