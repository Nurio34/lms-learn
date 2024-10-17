import axiosInstance from "../../../../../../../services/axios";
import {
    BasketItemsType,
    BillingAddressType,
    BuyerType,
    PaymentCardType,
    PurchaseInfoType,
    ShippingAddressType,
} from "../../../../Types/payment";

function PurchaseForm() {
    const purchaseInfo = {} as PurchaseInfoType;
    const paymentCard = {} as PaymentCardType;
    const buyer = {} as BuyerType;
    const shippingAddress = {} as ShippingAddressType;
    const billingAddress = {} as BillingAddressType;
    const basketItems = [] as BasketItemsType;

    const makePaymentRequest = async () => {
        try {
            const response = await axiosInstance.post("/payment/request", {
                purchaseInfo,
                paymentCard,
                buyer,
                shippingAddress,
                billingAddress,
                basketItems,
            });
            console.log({ response });
        } catch (error) {
            console.log(error);
        }
    };

    return <div>PurchaseForm</div>;
}

export default PurchaseForm;
