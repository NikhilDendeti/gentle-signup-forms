
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { countryCodes } from "@/lib/formValidation";
import { cn } from "@/lib/utils";

interface CountryCodeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

const CountryCodeSelector: React.FC<CountryCodeSelectorProps> = ({
  value,
  onChange,
  error = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedCountry = countryCodes.find((country) => country.code === value) || countryCodes[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
    >
      <button
        type="button"
        className={cn(
          "flex items-center justify-between gap-1 px-2 py-2 bg-white border rounded-md text-sm transition-all w-[80px]",
          error 
            ? "border-red-300 hover:border-red-400" 
            : "border-slate-200 hover:border-slate-300",
          isOpen && "border-slate-300"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-1">
          <span className="text-sm">{selectedCountry.flag}</span>
          <span className="text-sm font-medium">{selectedCountry.code}</span>
        </div>
        <ChevronDown size={14} className="text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-48 max-h-60 overflow-y-auto bg-white border border-slate-200 rounded-md shadow-soft-md animate-fade-in">
          <div className="p-2">
            <div className="flex items-center px-2 py-1 text-xs text-slate-500 border-b border-slate-100 pb-1 mb-1">
              <Globe size={12} className="mr-1" />
              <span>Select country code</span>
            </div>
            {countryCodes.map((country) => (
              <button
                key={country.code}
                type="button"
                className={cn(
                  "flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-md",
                  country.code === value
                    ? "bg-slate-50 text-hrms-primary"
                    : "hover:bg-slate-50"
                )}
                onClick={() => {
                  onChange(country.code);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <span>{country.flag}</span>
                  <span className="text-slate-700">{country.country}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-500">{country.code}</span>
                  {country.code === value && (
                    <Check size={14} className="text-hrms-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryCodeSelector;
