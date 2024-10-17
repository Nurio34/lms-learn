export type PurchaseInfoType = {
    locale: "turkish" | "other";
    conversationId: string;
    price: string;
    paidPrice: string;
    currency: "try" | "usd" | "eur";
    installments: number; //! taksit //
    basketId: string;
};

export type PaymentCardType = {
    cardHolderName: string; //!
    cardNumber: string; //!
    expireMonth: string; //!
    expireYear: string; //!
    cvc: string; //!
    registerCard: string; // kart sisteme kaydedilsin mi ? 0=no, 1=yes
};
export type BuyerType = {
    id: string; //!
    name: string; //!
    surname: string; //!
    gsmNumber: string; // optional. when user gives his gsm, save it to "user" data
    email: string; //!
    identityNumber: string; //! TC Kimlik No.
    lastLoginDate: string; // "user" datasına ekle, her loginde güncelle // "2013-04-21 15:12:09" formatında
    registrationDate: string; // "Buy Course" butonuna bastığın anki zaman // "2013-04-21 15:12:09" formatında
    registrationAddress: string; //! İkamet adresi
    ip: string; //! "user" datasına ekle, her loginde güncelle
    city: string; //!
    country: string; //!
    zipCode: string; // optional
};

export type ShippingAddressType = {
    contactName: string; //!
    city: string; //!
    country: string; //!
    address: string; //!
    zipCode: string; // optional
};

export type BillingAddressType = {
    contactName: string; //!
    city: string; //!
    country: string; //!
    address: string; //!
    zipCode: string; //
};

export type BasketItemType = {
    id: string; //!
    name: string; //!
    category1: string; //!
    category2: string; // optional
    itemType: "physical" | "virtual"; //!
    price: string; //!
};

export type BasketItemsType = BasketItemType[];
