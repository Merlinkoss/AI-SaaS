"use client";

import { useEffect, useState } from "react";
import ProModal from "./modal/pro-modal";
import PaymentModal from "./modal/payment-modal";
import PromocodeModal from "./modal/promocode-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <PromocodeModal />
            <ProModal />
            <PaymentModal />
        </>
    )
}