"use client";

import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components/mobile-sidebar";

interface NavbarProps {
  currentApiUsage: number;
  maxAvailableApi: number;
}

const Navbar = ({
  currentApiUsage = 0,
  maxAvailableApi = 1
}: NavbarProps) => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar currentApiUsage={currentApiUsage} maxAvailableApi={maxAvailableApi} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;