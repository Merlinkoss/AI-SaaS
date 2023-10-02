"use client";

import { CODE, CONVERSATION, GRAMMAR, IMAGE, THERAPIST } from "@/app/features";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image"

const TOOLS = [
  {
    title: "ChatGPT 4 is not available in your country?",
    description: "Use conversation in LampoAI",
    pos: "right",
    icon: "/chatgpt.svg"
  },
  {
    title: "Can't pay for ChatGPT?",
    description: "Pay with any crypto in LampoAI. We support USDT, BUSD, USDT, ETH, TRON, BNB, MATIC",
    pos: "left",
    icon: "/usdc.svg"
  },
  {
    title: "Bored from default conversation?",
    description: "Use special custom roles, like therapist OR grammar corrector",
    pos: "right",
    icon: "/logo.png"
  },
  {
    title: "Want to use Image generation from AI?",
    description: "Look at Image generation feature!",
    pos: "left",
    icon: "/imagegen.svg"
  }
];

export const LandingUsecases = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Use Cases</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5">
        {TOOLS.map((item) => (
          <>
            {(item.pos === "right") && (
              <div className="col-span-2" />
            )}
            <Card className="bg-[#192339] border-none text-white col-span-3 md:grid-cols-3 lg:grid-cols-3">
              <CardHeader>
                <CardTitle className="flex gap-x-2">
                  <div className="relative p-2 rounded-md w-10 h-10">
                    <Image
                      alt={item.title}
                      fill
                      src={item.icon} />
                  </div>
                  <div>
                    <p className="text-lg">{item.title}</p>
                    <p className="text-zinc-400 text-sm">{item.description}</p>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
            {(item.pos === "left") && (
              <div key={item.title} className="col-span-2" />
            )}
          </>

        ))}
      </div>
    </div>
  )
}