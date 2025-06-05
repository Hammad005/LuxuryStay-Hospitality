import React from "react";
import Logo from "./Logo";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="border-t-2 bg-background/30 backdrop-blur border-primary/50 p-4 text-center flex items-center md:justify-between justify-center w-full ">
        <div className="md:block hidden">
          <Logo />
        </div>
        <p className="text-sm text-primary">
          Copyright &copy; 2025 LuxuryStay Hospitality
        </p>
        <div className="gap-3 md:flex hidden">
          <Link to={"https://www.facebook.com/"} target="_blank">
            <Facebook className="text-primary hover:text-white" />
          </Link>
          <Link to={"https://twitter.com/"} target="_blank">
            <Twitter className="text-primary hover:text-white" />
          </Link>
          <Link to={"https://www.instagram.com/"} target="_blank">
            <Instagram className="text-primary hover:text-white" />
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
