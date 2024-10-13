import axiosInstance from "../../../../../services/axios";
type PaymentCardType = {
    cardHolderName: string;
    cardNumber: string;
    expireMonth: string;
    expireYear: string;
    cvc: string;
    registerCard: string;
};
type BuyerType = {
    id: string;
    name: string;
    surname: string;
    gsmNumber: string;
    email: string;
    identityNumber: string;
    lastLoginDate: string;
    registrationDate: string;
    registrationAddress: string;
    ip: string;
    city: string;
    country: string;
    zipCode: string;
};

type ShippingAddressType = {
    contactName: string;
    city: string;
    country: string;
    address: string;
    zipCode: string;
};

type BillingAddressType = {
    contactName: string;
    city: string;
    country: string;
    address: string;
    zipCode: string;
};

type ItemTypeType = "physical" | "virtual";

type BasketItemType = {
    id: "BI101";
    name: "Binocular";
    category1: "Collectibles";
    category2: "Accessories";
    itemType: ItemTypeType;
    price: "0.3";
};

type BasketItemsType = BasketItemType[];

function PurchaseButton() {
    const paymentCard = {} as PaymentCardType;
    const buyer = {} as BuyerType;
    const shippingAddress = {} as ShippingAddressType;
    const billingAddress = {} as BillingAddressType;
    const basketItems = [] as BasketItemsType;

    const makePaymentRequest = async () => {
        try {
            const response = await axiosInstance.post("/payment/request", {
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

    return (
        <button
            type="button"
            className="c-btn bg-white text-black hover:bg-gray-200 "
            style={{ fontVariant: "small-caps" }}
            onClick={makePaymentRequest}
        >
            Buy Course
        </button>
    );
}

export default PurchaseButton;
