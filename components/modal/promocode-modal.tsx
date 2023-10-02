"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { userPromocodeModal } from "@/hooks/use-promocode";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  promocode: z.string().min(1, {
    message: "Promocode invalid",
  })
}
)

const PromocodeModal = () => {
  const promocodeModal = userPromocodeModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      promocode: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const response = await axios.post("api/promocode", {
         promocode: values.promocode.toLowerCase() 
      });

      if(response.status !== 200) {
        toast.error(values.promocode + "not used")
      } else {
        toast.success(values.promocode + " succesfully used")
      }
      promocodeModal.onClose()
    } catch (error) {
      toast.error("Promocode can't be used");
    } finally {
      setIsLoading(false)
      router.refresh()
    }
  }

  return (
    <Dialog open={promocodeModal.isOpen} onOpenChange={promocodeModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Enter promocode
            </div>
          </DialogTitle>

        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              name="promocode"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="m-0 p-5">
                    <Input
                      type="text"
                      disabled={isLoading}
                      placeholder="Enter promocode here"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )} />
            <Button
              disabled={isLoading}
              type="submit"
              size="lg"
              variant="premium"
              className="w-full"
            >
              Enter promocode
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PromocodeModal;