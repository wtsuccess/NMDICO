import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
import { addNMDToMetamask, addUSDTToMetamask } from "../utils/metamask";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

const Footer = () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const { data: signer } = useSigner();

  // const toggleDropdown = () => {
  //   setIsOpen((isOpen) => !isOpen);
  // };
  return (
    <footer className="bg-black">
      <div className="flex justify-between py-2 px-6 items-center text-white text-sm md:text-lg">
        <ul className="flex justify-between">
          <li className="pr-[20px] relative">
            <FontAwesomeIcon
              icon={faGlobe}
              size="sm"
              // onClick={toggleDropdown}
              className="px-[5px]"
            />
            EN
          </li>
          <li className="px-[10px]">
            <FontAwesomeIcon icon={faTwitter} size="sm" />
          </li>
          <li className="px-[10px]">
            <FontAwesomeIcon icon={faPaperPlane} size="sm" />
          </li>
          <li className="px-[10px]">
            <FontAwesomeIcon icon={faGithub} size="sm" />
          </li>
        </ul>
        <div className="flex justify-center">
          <button
            type="button"
            className="py-2 px-4 mx-4 rounded-lg bg-orange-500 hover:bg-blue-700 text-[12px] sm:text-base cursor-pointer"
            onClick={addNMDToMetamask}
          >
            ADD NMD
          </button>
          <button
            type="button"
            className="py-2 px-4 rounded-lg bg-[#40b126] hover:bg-blue-700 text-[12px] sm:text-base cursor-pointer"
            onClick={addUSDTToMetamask}
          >
            ADD USDT
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
