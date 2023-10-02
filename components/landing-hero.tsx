"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image"

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold pt-36 text-center space-y-5 pb-20">
      <div className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl space-y-8 font-extrabold">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pl-10">
          <TypewriterComponent
            options={{
              strings: [
                "Conversation",
                "Relax",
                "Work"
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Create content using AI 10x faster.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Start Generating For Free
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        Crypto payment available
      </div>
      <div className="flex gap-2 mt-8 justify-center">
        <Image
          height={24}
          width={24}
          alt="usdt"
          src="/usdt.svg" />
        <Image
          height={24}
          width={24}
          alt="tron"
          src="/tron.svg" />
        <Image
          height={24}
          width={24}
          alt="bnb"
          src="/bnb.svg" />
        <Image
          height={24}
          width={24}
          alt="busd"
          src="/busd.svg" />
        <Image
          height={24}
          width={24}
          alt="matic"
          src="/matic.svg" />
        <Image
          height={24}
          width={24}
          alt="usdc"
          src="/usdc.svg" />

      </div>
    </div>
  );
};