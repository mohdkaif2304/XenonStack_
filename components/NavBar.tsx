"use client";
import { Building2, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="px-4 lg:px-6 top-0 sticky bg-white/80 backdrop-blur-xl border-b border-blue-100/50 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
        <Link
          className="flex items-center justify-center gap-2 font-bold text-xl group"
          href="/"
        >
          <Building2 className="h-6 w-6 text-blue-500 group-hover:rotate-12 transition-transform duration-300" />
          <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">EstateNex</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="items-center hidden gap-8 lg:flex">
          {[
            ["Home", "/"],
            ["All PG/Flats", "/all-pg"],
            ["About", "/about"],
            ["Contact", "/contact"]
          ].map(([label, href]) => (
            <Link
              key={href}
              className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full"
              href={href}
            >
              {label}
            </Link>

          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            href="/all-pg" 
            className="hidden lg:inline-flex px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            All PG/Flats
          </Link>
          <Link 
            href="/pg-owner/dashboard"
            className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-blue-500 text-blue-500 font-medium text-sm hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            <Building2 className="h-4 w-4" />
            Estate Holder
          </Link>


          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-blue-100/50">
          <nav className="flex flex-col p-4 space-y-4">
            {[
              ["Home", "/"],
              ["All PG/Flats", "/all-pg"],
              ["About", "/about"],
              ["Contact", "/contact"]
            ].map(([label, href]) => (
              <Link
                key={href}
                className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
                href={href}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link 
              href="/all-pg"
              onClick={() => setIsOpen(false)}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium text-sm hover:shadow-lg text-center transition-all duration-300"
            >
              All PG/Flats
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
