
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-hrms-primary text-white font-bold">
        HR
      </div>
      <span className="font-medium text-slate-800">EasyHR</span>
    </div>
  );
};

export default Logo;
