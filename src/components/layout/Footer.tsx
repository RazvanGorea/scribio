import React from "react";
import { AiFillGithub } from "react-icons/ai";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="flex justify-end px-5 py-3 bg-slate-800 dark:bg-slate-900">
      <a
        href="https://github.com/RazvanGorea"
        className="flex items-center space-x-2 text-gray-500"
      >
        <AiFillGithub size={30} />
        <span className="text-gray-500">RazvanGorea</span>
      </a>
    </footer>
  );
};

export default Footer;
