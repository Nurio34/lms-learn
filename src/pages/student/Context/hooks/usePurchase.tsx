import { useState } from "react";
import {
    initialBasketItems,
    initialBillingAddress,
    initialBuyer,
    initialPaymentCard,
    initialPurchaseInfo,
    initialShippingAddress,
} from "../../Types/payment";

const usePurchase = () => {
    const [purchaseForm, setPurchaseForm] = useState({
        purchaseInfo: initialPurchaseInfo,
        paymentCard: initialPaymentCard,
        buyer: initialBuyer,
        shippingAddress: initialShippingAddress,
        billingAddress: initialBillingAddress,
        basketItems: initialBasketItems,
    });
    return { purchaseForm, setPurchaseForm };
};

export default usePurchase;
