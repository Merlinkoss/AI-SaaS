"use client";

import { CODE, CONVERSATION, GRAMMAR, IMAGE, MUSIC, THERAPIST, VIDEO } from "@/app/features";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useProModal } from "@/hooks/use-pro-modal";

const pricing = [
  {
    price: "1",
    amount: "5",
  },
  {
    price: "6",
    amount: "50",
  },
  {
    price: "11",
    amount: "500",
  },
];

const TOOLS = [
  CONVERSATION,
  IMAGE,
  // VIDEO,
  // MUSIC,
  GRAMMAR,
  THERAPIST,
  CODE
]

export const LandingPricelist = () => {
  const { isSignedIn } = useAuth();
  const proModal = useProModal();


  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Pricing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {pricing.map((item) => (
          <Card key={item.price} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="text-center justify-center">
                <div>
                  <p className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl">{item.price} $</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0 space-y-5">
                <div className="pt-4 ps-2">
                  {item.amount} questions to ChatGPT
                </div>
                {TOOLS.map((tool) => (
                  <Card
                    key={tool.label}
                    className="p-3 border-black/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-x-4">
                      <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                        <tool.icon className={cn("w-6 h-6", tool.color)} />
                      </div>
                      <div className="font-semibold text-sm">
                        {tool.label}
                      </div>
                      <Check className="text-primary w-5 h-5" />
                    </div>

                  </Card>
                ))}
                <div className="text-center justify-center">
                  <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button onClick={() => { if (isSignedIn) proModal.onOpen() }} variant="premium">
                      Try it now with 1 for free!
                      <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}