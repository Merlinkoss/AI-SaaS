"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { ChevronRightSquare, Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import { userPromocodeModal } from "@/hooks/use-promocode";

interface GenerationCounterProps {
    currentApiUsage: number;
    maxAvailableApi: number;
}

const GenerationCounter = ({
    currentApiUsage = 0,
    maxAvailableApi = 1
}: GenerationCounterProps) => {
    const proModal = useProModal();
    const promocodeModal = userPromocodeModal();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="px-3">
            <Card className="bg-[#283146] border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {maxAvailableApi - currentApiUsage} Generations left
                        </p>
                        <Progress
                            className="h-3"
                            value={(currentApiUsage / maxAvailableApi) * 100}
                        />
                    </div>
                    <Button onClick={proModal.onOpen} variant="premium" className="w-full">
                        Get more
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                    <Button onClick={promocodeModal.onOpen} variant="premium_secondary" className="w-full mt-2">
                        Promocode
                        <ChevronRightSquare className="w-4 h-4 ml-2" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default GenerationCounter;