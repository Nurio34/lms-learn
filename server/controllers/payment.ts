import { Iyzipay, iyzipay } from "../iyzipay";

type SavedPaymentCard = {
    cardToken?: string;
    cardUserKey: string;
    ucsToken?: string;
    consumerToken?: string;
};

type PaymentCard = {
    cardHolderName: string;
    cardNumber: string;
    expireMonth: string;
    expireYear: string;
    cvc?: string;
    registerCard?: number;
    registerConsumerCard?: boolean;
    cardAlias: string;
};

type BuyerDetails = {
    id: string;
    name: string;
    surname: string;
    gsmNumber?: string;
    email?: string;
    identityNumber: string;
    lastLoginDate?: string;
    registrationDate?: string;
    registrationAddress: string;
    ip: string;
    city: string;
    country: string;
    zipCode?: string;
};

type AddressDetails = {
    contactName: string;
    city: string;
    country: string;
    address: string;
    zipCode?: string;
};

interface BasketItem {
    id: string;
    name: string;
    category1: string;
    category2?: string;
    itemType: "PHYSICAL" | "VIRTUAL";
    price: number | string;
    subMerchantPrice?: number | string;
    subMerchantKey?: string;
}

type PaymentRequestData = {
    locale?: "TR" | "EN";
    conversationId?: string;
    price: number | string;
    paidPrice: number | string;
    currency?: "TRY" | "USD" | "EUR" | "IRR" | "GBP" | "NOK" | "RUB" | "CHF";
    installments: number;
    basketId?: string;
    paymentChannel?:
        | "MOBILE"
        | "WEB"
        | "MOBILE_WEB"
        | "MOBILE_IOS"
        | "MOBILE_ANDROID"
        | "MOBILE_WINDOWS"
        | "MOBILE_TABLET"
        | "MOBILE_PHONE";
    paymentGroup?: "PRODUCT" | "LISTING" | "SUBSCRIPTION";
    paymentCard: SavedPaymentCard | PaymentCard;
    buyer: BuyerDetails;
    shippingAddress: AddressDetails;
    billingAddress: AddressDetails;
    basketItems: BasketItem[];
};

export const makeRequest = async (req, res) => {
    const {
        purchaseInfo,
        paymentCard,
        buyer,
        shippingAddress,
        billingAddress,
        basketItems,
    } = req.body;

    //! *** LOCALE DÜZELLE ***
    const locale =
        purchaseInfo.locale === "turkish"
            ? Iyzipay.LOCALE.TR
            : Iyzipay.LOCALE.EN;
    //! **********************
    //! *** CURRENCY DÜZENLE ***
    const currency =
        purchaseInfo.currency === "try"
            ? Iyzipay.CURRENCY.TRY
            : purchaseInfo.currency === "usd"
            ? Iyzipay.CURRENCY.USD
            : Iyzipay.CURRENCY.EUR;
    //! ************************
    //! *** OTHERS ***
    const paymentChannel = Iyzipay.PAYMENT_CHANNEL.WEB;
    const paymentGroup = Iyzipay.PAYMENT_GROUP.PRODUCT;
    //! **************
    //! *** BASKET ITEMTYPE'LARI YENİDEN DÜZENLE ***
    const newBasketItems = basketItems.map((item: BasketItem) => {
        return {
            ...item,
            itemType: true
                ? Iyzipay.BASKET_ITEM_TYPE.PHYSICAL
                : Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
        };
    });

    //! ***************************************

    const PaymentRequest = {
        ...purchaseInfo,
        locale,
        currency,
        paymentChannel,
        paymentGroup,

        paymentCard,
        buyer,
        shippingAddress,
        billingAddress,
        basketItems: newBasketItems,
    };

    try {
        const response = iyzipay.payment.create(
            PaymentRequest,
            async (err, result) => {
                console.log({ err, result });
            },
        );

        console.log({ response });
    } catch (error) {
        console.log(error);
    }
};

// module.exports = { makeRequest };
