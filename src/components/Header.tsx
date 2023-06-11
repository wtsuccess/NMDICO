import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
    return (
        <header className="flex justify-between py-4 px-6 items-center bg-zinc-800 text-white">
            <a href="" className="">PancakeSwap</a>
            <ConnectButton showBalance={false} />
        </header>
    )
}

export default Header;