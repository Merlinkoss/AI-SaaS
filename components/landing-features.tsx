"use client";

import { CODE, CONVERSATION, GRAMMAR, IMAGE, THERAPIST } from "@/app/features";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const TOOLS = [
  CONVERSATION,
  IMAGE,
  // VIDEO,
  // MUSIC,
  GRAMMAR,
  THERAPIST,
  CODE,
];

export const LandingFeatures = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {TOOLS.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex gap-x-2">
                <div className={cn("p-2 rounded-md h-fit w-fit", item.bgColor)}>
                  <item.icon className={cn("w-10 h-10", item.color)} />
                </div>
                <div>
                  <p className="text-lg">{item.label}</p>
                  <p className="text-zinc-400 text-sm">{item.description}</p>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
