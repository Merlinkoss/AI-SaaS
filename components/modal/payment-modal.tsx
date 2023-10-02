"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Image from "next/image";
import { usePaymentInProgressStore } from "@/hooks/use-payment-in-progress-modal";


const PaymentModal = () => {
  const paymentModal = usePaymentInProgressStore();

  const onOkClick = () => {
    paymentModal.onClose();
  }

  return (
    <Dialog open={paymentModal.isOpen} onOpenChange={paymentModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              You almost 
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
          <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="w-10 h-10 relative animate-spin">
                <Image
                    alt="logo"
                    fill
                    src="/logo.png"
                />
            </div>
            <p className="text-sm text-muted-foreground">
                We received and processing your payment!
            </p>
            <p className="text-sm text-muted-foreground">
                Attepmt to generation will be added on your account
            </p>
        </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={onOkClick}
            size="lg"
            variant="premium"
            className="w-full"
          >
            Okay, I will wait!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;