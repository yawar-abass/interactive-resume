import React from "react";

const Footer = () => {
  return (
    <div className="absolute bottom-5 text-sm text-gray-500">
      © {new Date().getFullYear()} Built by Yawar Abass
    </div>
  );
};

export default Footer;
