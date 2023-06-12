import React from "react";
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
    return (
        <div className=" bg-zinc-800">
            <div className="container mx-auto flex justify-between py-4 px-6 items-center text-white">
                <p className="flex-1">Copyright {new Date().getFullYear()} namomudra.com - All Rights Reserved.</p>
                <p className="flex-1 text-right">
                    <i className="fa fa-twitter cursor-pointer px-3" aria-hidden="true"></i>
                    <i className="fa fa-github cursor-pointer px-3" aria-hidden="true"></i>
                    <i className="fa fa-facebook cursor-pointer px-3" aria-hidden="true"></i>
                    <i className="fa fa-google cursor-pointer px-3" aria-hidden="true"></i>
                </p>
            </div>
        </div>
    );
}

export default Footer;