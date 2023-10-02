interface AmountToPrice {
    [key: string]: number;
}

const priceList: AmountToPrice = {
    "5": 1,
    "50": 6,
    "500": 11
};

export function getPriceForAmount(amount: string): number {
    return priceList[amount];
}


