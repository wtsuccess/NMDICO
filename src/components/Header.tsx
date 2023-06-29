import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { ConnectionButton } from "./ConnectionButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setIsOpen((isOpen) => !isOpen);
  // };

  return (
    <header className="shadow-md py-3 px-2">
      <div className="mx-auto flex justify-between py-1 px-6 items-center text-white">
        <a href="http://namomudra.com" className="cursor-pointer text-[26px] font-[400]">NamoMudra</a>
        <div className="flex items-center justify-between ">
          <div className="relative">
            <FontAwesomeIcon icon={faGlobe} className="pr-4" size="xl"/>
            {/* {isOpen && (`
              <div className="absolute top-[40px] left-[0]">
                <span className="w-[25px] h-[25px] inline-block bg-black rotate-45 cursor-pointer z-0"></span>
                <ul
                  className="bg-black my-[-25px] mx-[-5px] z-20 py-2 w-[150px] px-2 relative text-[#b8add2]"
                  onClick={(e) => {
                    setIsOpen(false);
                  }}
                >
                  <li className="cursor-pointer text-left  font-thin ">
                    English
                  </li>
                  <li className="cursor-pointer text-left  font-thin">Hindi</li>
                </ul>
              </div>
            )} */}
          </div>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
