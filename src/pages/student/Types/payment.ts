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
    currency: z.enum(["try", "usd", "eur"], {
        message: "",
    }),
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
    currency: "try",
    installment: 1,
    locale: "turkish",
    paidPrice: "",
    price: "",
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
    registerCard: z.union([z.literal(0), z.literal(1)], {
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
    registerCard: 0,
};

export const BuyerSchema = z.object({
    id: z.string().min(1, "ID is required.").optional(),
    name: z.string().min(1, "Name is required."),
    surname: z.string().min(1, "Surname is required."),
    gsmNumber: z
        .string()
        .regex(/^\+?\d{10,15}$/, {
            message:
                "GSM number must be between 10 and 15 digits and can include a '+' prefix.",
        })
        .nullable(),
    email: z.string().email("Invalid email format."),
    identityNumber: z
        .string()
        .length(11, "Identity number must be exactly 11 digits.")
        .regex(/^\d{11}$/, "Identity number must only contain digits."),
    lastLoginDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, {
            message:
                "Last login date must be in the format 'YYYY-MM-DD HH:mm:ss'.",
        })
        .nullable(),
    registrationDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, {
            message:
                "Registration date must be in the format 'YYYY-MM-DD HH:mm:ss'.",
        }),
    registrationAddress: z.string().min(1, "Registration address is required."),
    ip: z.string().optional(),

    city: z.string().min(1, "City is required."),
    country: z.string().min(1, "Country is required."),
    zipCode: z.string().optional(),
});

export type BuyerType = z.infer<typeof BuyerSchema>;

export const initialBuyer: BuyerType = {
    id: "",
    name: "",
    surname: "",
    gsmNumber: "",
    email: "",
    identityNumber: "",
    lastLoginDate: "",
    registrationDate: "",
    registrationAddress: "",
    ip: "",
    city: "",
    country: "",
    zipCode: "",
};

export const ShippingAddressSchema = z.object({
    contactName: z.string().min(1, "Contact name is required."),
    city: z.string().min(1, "City is required."),
    country: z.string().min(1, "Country is required."),
    address: z.string().min(1, "Address is required."),
    zipCode: z.string().optional(),
});

export type ShippingAddressType = z.infer<typeof ShippingAddressSchema>;

export const initialShippingAddress: ShippingAddressType = {
    contactName: "",
    city: "",
    country: "",
    address: "",
    zipCode: "",
};

export type BillingAddressType = {
    contactName: string; //!
    city: string; //!
    country: string; //!
    address: string; //!
    zipCode?: string; //
};
export const initialBillingAddress: BillingAddressType = {
    contactName: "",
    city: "",
    country: "",
    address: "",
    zipCode: "",
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
