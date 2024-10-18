import { z } from "zod";

export const PurchaseInfoSchema = z.object({
    locale: z.enum(["turkish", "other"], {
        required_error: "Locale is required.",
        invalid_type_error: "Locale must be either 'turkish' or 'other'.",
    }),
    conversationId: z.string().min(1, {
        message: "Conversation ID is required.",
    }),
    price: z
        .string()
        .min(1, {
            message: "Price is required.",
        })
        .regex(/^\d+(\.\d{1,2})?$/, {
            message:
                "Price must be a valid number with up to two decimal places.",
        }),
    paidPrice: z
        .string()
        .min(1, {
            message: "Paid price is required.",
        })
        .regex(/^\d+(\.\d{1,2})?$/, {
            message:
                "Paid price must be a valid number with up to two decimal places.",
        }),
    currency: z.enum(["try", "usd", "eur"]).nullable().optional(),
    installment: z.union(
        [
            z.literal(1),
            z.literal(2),
            z.literal(3),
            z.literal(6),
            z.literal(9),
            z.literal(12),
        ],
        {
            required_error: "Installment is required.",
        },
    ),
    basketId: z.string().min(1, {
        message: "Basket ID is required.",
    }),
});

export type PurchaseInfoType = z.infer<typeof PurchaseInfoSchema>;

export const initialPurchaseInfo: PurchaseInfoType = {
    basketId: "",
    conversationId: "",
    currency: null,
    installment: 1,
    locale: "turkish",
    paidPrice: "10",
    price: "10",
};

export const PaymentCardSchema = z.object({
    cardHolderName: z
        .string()
        .min(7, {
            message: "Cardholder name must be at least 7 characters long.",
        })
        .refine((name) => name.includes(" "), {
            message: "Cardholder name must contain at least one space.",
        }),
    cardNumber: z
        .string()
        .length(16, {
            message: "Card number must be exactly 16 digits.",
        })
        .regex(/^\d{16}$/, {
            message: "Card number must only contain digits.",
        }),
    expireMonth: z
        .string()
        .length(2, {
            message: "Expiration month must be 2 digits.",
        })
        .regex(/^(0[1-9]|1[0-2])$/, {
            message: "Expiration month must be between 01 and 12.",
        }),
    expireYear: z
        .string()
        .length(4, {
            message: "Expiration year must be 4 digits.",
        })
        .regex(/^\d{4}$/, {
            message: "Expiration year must only contain digits.",
        }),
    cvc: z
        .string()
        .length(3, {
            message: "CVC must be exactly 3 digits.",
        })
        .regex(/^\d{3}$/, {
            message: "CVC must only contain digits.",
        }),
    registerCard: z.enum(["0", "1"], {
        required_error: "Please select whether to register the card.",
    }),
});

export type PaymentCardType = z.infer<typeof PaymentCardSchema>;

export const initialPaymentCard: PaymentCardType = {
    cardHolderName: "",
    cardNumber: "",
    cvc: "",
    expireMonth: "",
    expireYear: "",
    registerCard: "0",
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
export const initialBuyer: BuyerType = {
    id: "123456789",
    name: "John",
    surname: "Doe",
    gsmNumber: "5551234567",
    email: "john.doe@example.com",
    identityNumber: "12345678901",
    lastLoginDate: "2024-10-18 12:34:56",
    registrationDate: "2024-10-01 09:15:00",
    registrationAddress: "123 Main St, Antalya",
    ip: "192.168.1.1",
    city: "Antalya",
    country: "Turkey",
    zipCode: "07100",
};

export type ShippingAddressType = {
    contactName: string; //!
    city: string; //!
    country: string; //!
    address: string; //!
    zipCode: string; // optional
};
export const initialShippingAddress: ShippingAddressType = {
    contactName: "Jane Doe",
    city: "Istanbul",
    country: "Turkey",
    address: "456 Another St, Besiktas",
    zipCode: "34349",
};

export type BillingAddressType = {
    contactName: string; //!
    city: string; //!
    country: string; //!
    address: string; //!
    zipCode: string; //
};
export const initialBillingAddress: BillingAddressType = {
    contactName: "John Doe",
    city: "Antalya",
    country: "Turkey",
    address: "123 Main St, Antalya",
    zipCode: "07100",
};

export type BasketItemType = {
    id: string; //!
    name: string; //!
    category1: string; //!
    category2?: string; // optional
    itemType: "physical" | "virtual"; //!
    price: string; //!
};

export const initialBasketItems: BasketItemsType = [
    {
        id: "item123",
        name: "Web Development Course",
        category1: "Education",
        category2: "Online Learning",
        itemType: "virtual",
        price: "10",
    },
];

export type BasketItemsType = BasketItemType[];
