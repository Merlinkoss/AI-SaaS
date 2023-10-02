"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Check } from "lucide-react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { CODE, CONVERSATION, GRAMMAR, IMAGE, MUSIC, THERAPIST, VIDEO } from "@/app/features";
import { getPriceForAmount } from "@/lib/constants";

const tools = [
  CONVERSATION,
  IMAGE,
  // VIDEO,
  // MUSIC,
  GRAMMAR,
  THERAPIST,
  CODE
]

const ProModal = () => {
  const proModal = useProModal();
  const [isLoading, setIsLoading] = useState(false);

  const onPaymentClick = async (amount: string) => {
    try {
      setIsLoading(true)
      const response = await axios.get("api/payment", {
        params: { amount: amount }
      });

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong with payment");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Get more attempt and generate like
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
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
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isLoading}
            onClick={() => onPaymentClick("5")}
            size="lg"
            variant="premium"
            className="w-full"
          >
            5 attempt for {getPriceForAmount("5")}$
          </Button>
             
          <Button
            disabled={isLoading}
            onClick={() => onPaymentClick("50")}
            size="lg"
            variant="premium"
            className="w-full mb-2"
          >
            50 attempt for {getPriceForAmount("50")}$
          </Button>

          <Button
            disabled={isLoading}
            onClick={() => onPaymentClick("500")}
            size="lg"
            variant="premium"
            className="w-full mb-2"
          >
            500 attempt for {getPriceForAmount("500")}$
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;