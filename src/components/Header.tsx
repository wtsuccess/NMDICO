import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConnectWallet from "./ConnectWallet";

const Header = () => {
  return (
    <header className="shadow-md py-3 px-2">
      <div className="mx-auto flex justify-between py-1 px-6 items-center text-white">
        <a
          href="http://namomudra.com"
          className="cursor-pointer text-[26px] font-[400]"
        >
          NamoMudra
        </a>
        <div className="flex items-center justify-between ">
          <div className="relative">
            <FontAwesomeIcon icon={faGlobe} className="pr-4" size="xl" />
          </div>
          <div className="bg-black px-2 py-1 rounded-md">
            <ConnectWallet />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
