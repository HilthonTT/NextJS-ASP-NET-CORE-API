"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Home } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 h-14 w-full flex items-center justify-between bg-secondary space-x-2 p-1">
      <div>
        <Link
          href="/"
          className="font-semibold hover:opacity-75 transition ml-2 flex items-center">
          <Home className="h-5 w-5 mr-1" />
          Home
        </Link>
      </div>
      <div className="">
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};
