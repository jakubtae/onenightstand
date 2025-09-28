"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [showHamburger, setShowHamburger] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setShowHamburger(window.innerWidth < 600);
    };

    // Check on mount
    checkScreenWidth();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <nav>
      <div className="flex w-full px-1 lg:px-8 flex-row justify-between items-center py-4 relative">
        {/* Hamburger Menu Button */}
        {showHamburger && (
          <Button
            variant="ghost"
            className="mr-2 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="flex flex-col justify-center items-center w-6 h-6">
              <span
                className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                  menuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-0.5"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                  menuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-0.5"
                }`}
              ></span>
            </div>
          </Button>
        )}

        {/* Logo */}
        <div className="flex flex-1 justify-between items-center">
          <Button
            variant="link"
            className="text-xl lg:text-2xl font-bold text-gray-800"
            asChild
          >
            <Link href="/">LockIn.digital</Link>
          </Button>
          {/* Page Navigation - Hidden on small screens when hamburger is shown */}
          {!showHamburger && (
            <div className="flex flex-1 justify-center items-center gap-4 px-2">
              <Button variant="link" asChild>
                <Link href="/reframinghub">Reframing Hub</Link>
              </Button>
              <Button variant="link" asChild>
                <Link href="/materials">Materials</Link>
              </Button>
            </div>
          )}
          {/* Get Started Button - Always visible */}
          <Button variant="secondary" asChild>
            <Link href="/start">Get started</Link>
          </Button>
        </div>

        {/* Vertical Dropdown Menu */}
        {menuOpen && showHamburger && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 border-t">
            <div className="flex flex-col p-4">
              <Button variant="link" asChild className="justify-start py-3">
                <Link href="/reframinghub" onClick={() => setMenuOpen(false)}>
                  Reframing Hub
                </Link>
              </Button>
              <Button variant="link" asChild className="justify-start py-3">
                <Link href="/materials" onClick={() => setMenuOpen(false)}>
                  Materials
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
