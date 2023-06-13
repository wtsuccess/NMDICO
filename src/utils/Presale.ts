import { ethers } from "ethers";
import { presaleContractAddress, usdtContractAddress } from "../constants/basic"
import { Presale__factory, USDT__factory } from "../types"

export const getTokenAmountPerUSDT = async (provider: ethers.providers.Provider | ethers.Signer) => {
    const presale = Presale__factory.connect(presaleContractAddress, provider);
    try {
        const tokenAmountPerUSDT = await presale.tokenprice();
        return tokenAmountPerUSDT.toNumber();
    } catch (err) {
        console.log(err);
        return 0;
    }
}

export const buyNMDToken = async (USDTAmount: number, signer: ethers.Signer ) => {
    const presale = Presale__factory.connect(presaleContractAddress, signer);
    try {
        const usdt = USDT__factory.connect(usdtContractAddress, signer);
        if ((await usdt.allowance(await signer.getAddress(), presaleContractAddress)).lt(ethers.utils.parseUnits(USDTAmount + "", 18))) {
            await usdt.approve(presaleContractAddress, ethers.utils.parseEther(USDTAmount + ""));
        }
        await presale.buyTokens(ethers.utils.parseEther(USDTAmount + ""));
        return true;
    } catch(err) {
        return false;
    }
} 