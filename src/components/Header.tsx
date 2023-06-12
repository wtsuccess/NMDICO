import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
    return (
        <header className=" bg-zinc-800">
            <div className="container mx-auto flex justify-between py-4 px-6 items-center text-white">
            <span className="cursor-pointer">NAMOMUDRA</span>
            <ConnectButton showBalance={false} />
            </div>
        </header>
    )
}

export default Header;