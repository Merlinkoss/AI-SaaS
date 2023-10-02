"use client";
import { useRouter } from "next/navigation";
import { usePaymentInProgressStore } from "@/hooks/use-payment-in-progress-modal";

const PostPaymentPage = () => {
  const { push } = useRouter();
  const paymentModal = usePaymentInProgressStore();
  paymentModal.onOpen();
  push("/settings");
  return <p></p>;
};

export default PostPaymentPage;
