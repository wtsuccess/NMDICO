import { ethers } from "ethers";
import { presaleContractAddress } from "../constants/basic"
import { Presale__factory } from "../types"

export const getTokenAmountPerUSDT = async (provider: ethers.providers.Provider | ethers.Signer) => {
    const presale = Presale__factory.connect(presaleContractAddress, provider);
    try {
        const tokenAmountPerUSDT = await presale.tokenprice();
        console.log(tokenAmountPerUSDT);
        console.log(ethers.utils.parseEther( tokenAmountPerUSDT + ""));
        return tokenAmountPerUSDT.toNumber();
    } catch (err) {
        console.log(err);
        return 0;
    }
}

export const buyNMDToken = async (USDTAmount: number, signer: ethers.Signer ) => {
    const presale = Presale__factory.connect(presaleContractAddress, signer);
    try {
        await presale.buyTokens(USDTAmount);
        console.log("success");
        return "success";
    } catch(err) {
        console.log(err);
        return "failed";
    }
} 