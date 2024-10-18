const { Iyzipay, iyzipay } = require("../iyzipay");
const makeRequest = async (req, res) => {
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
    const newBasketItems = basketItems.map((item) => {
        return {
            ...item,
            itemType:
                item.itemType === "physical"
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

    console.log(PaymentRequest);

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

module.exports = { makeRequest };
