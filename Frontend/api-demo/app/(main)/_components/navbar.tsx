"use client";

import { Home } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 h-14 w-full flex items-center justify-between bg-secondary space-x-2">
      <Link
        href="/"
        className="font-semibold hover:opacity-75 transition ml-2 flex items-center">
        <Home className="h-5 w-5 mr-1" />
        Home
      </Link>
    </nav>
  );
};
