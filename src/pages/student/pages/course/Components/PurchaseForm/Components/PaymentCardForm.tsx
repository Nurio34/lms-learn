import { useStudentContext } from "../../../../../Context";
import {
    PaymentCardSchema,
    PurchaseInfoSchema,
} from "../../../../../Types/payment";
import { useEffect, useState } from "react";

function PaymentCardForm({
    setStep,
}: {
    setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
    const { purchaseForm, setPurchaseForm } = useStudentContext();
    const [errors, setErrors] = useState<any>({});

    const ValidateAndNext = () => {
        const PurchaseInfoValidationResult = PurchaseInfoSchema.safeParse(
            purchaseForm.purchaseInfo,
        );

        if (!PurchaseInfoValidationResult.success) {
            setErrors({
                ...PurchaseInfoValidationResult.error.flatten().fieldErrors,
            });
        }
        const PaymentCardValidationResult = PaymentCardSchema.safeParse(
            purchaseForm.paymentCard,
        );
        if (!PaymentCardValidationResult.success) {
            setErrors({
                ...PaymentCardValidationResult.error.flatten().fieldErrors,
            });
        }
        if (
            PurchaseInfoValidationResult.success &&
            PaymentCardValidationResult.success
        ) {
            setStep((prev) => prev + 1);
        }
    };

    const formatCardNumber = () => {
        const num = purchaseForm.paymentCard.cardNumber;
        let array: string[] = [];
        array = num.toString().split("");

        array = array.map((item, index) => {
            if (index === 3) {
                return `${item} - `;
            } else if (
                (index <= 11 && index !== 0 && index % 7 === 0) ||
                (index <= 11 && index !== 0 && index % 11 === 0)
            ) {
                return `${item} - `;
            }
            return item;
        });

        return array;
    };
    useEffect(() => {
        formatCardNumber();
    }, [purchaseForm.paymentCard.cardNumber]);

    return (
        <div className=" space-y-3">
            <div className="min-h-[40vh] md:min-h-80">
                <figure className=" relative">
                    <div className=" absolute">
                        <img
                            src="/credit_card/bg-card-back.png"
                            alt=""
                            className=" w-3/4"
                        />
                        <div className=" absolute top-[74px] left-[250px] text-black font-semibold">
                            {purchaseForm.paymentCard.cvc}
                        </div>
                    </div>
                    <div className=" absolute top-28 left-20 ">
                        <img
                            src="/credit_card/bg-card-front.png"
                            alt=""
                            className=" "
                        />
                        <div
                            className="absolute top-[20px] left-[25px] font-semibold text-white
                            flex items-center gap-[2vw] md:gap-3
                        "
                        >
                            <div className="w-[5vw] md:w-9 aspect-square rounded-full bg-gray-300"></div>
                            <div className="w-[3vw] md:w-7 aspect-square rounded-full bg-gray-100"></div>
                        </div>
                        <div className="absolute top-[6vh] md:top-[74px] left-[9vw] md:left-[50px] font-semibold text-white ">
                            <div
                                className=" capitalize text-xs md:text-base"
                                style={{ fontVariant: "small-caps" }}
                            >
                                {purchaseForm.paymentCard.cardHolderName}
                            </div>
                            <div className="text-xs md:text-base">
                                {formatCardNumber()}
                            </div>
                            <div className=" flex gap-1">
                                <div className="text-xs md:text-base">
                                    {purchaseForm.paymentCard.expireMonth}
                                </div>
                                {purchaseForm.paymentCard.expireMonth && (
                                    <span className="text-xs md:text-base">
                                        /
                                    </span>
                                )}
                                <div className="text-xs md:text-base">
                                    {purchaseForm.paymentCard.expireYear
                                        .toString()
                                        .slice(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                </figure>
            </div>
            <div className=" grid text-black gap-3">
                <label htmlFor="cardHolderName">
                    <input
                        type="text"
                        name="cardHolderName"
                        id="cardHolderName"
                        placeholder="Card Holder Name ..."
                        className=" w-full py-1 px-3 rounded-md"
                        value={purchaseForm.paymentCard.cardHolderName}
                        onChange={(e) => {
                            setPurchaseForm((prev) => ({
                                ...prev,
                                paymentCard: {
                                    ...prev.paymentCard,
                                    cardHolderName: e.target.value,
                                },
                            }));
                        }}
                    />
                    <p className=" text-[red] text-xs">
                        {errors?.cardHolderName ? errors.cardHolderName[0] : ""}
                    </p>
                </label>
                <label htmlFor="cardNumber">
                    <input
                        type="tel"
                        name="cardNumber"
                        id="cardNumber"
                        placeholder="Card Number"
                        maxLength={16}
                        className=" w-full py-1 px-3 rounded-md"
                        value={purchaseForm.paymentCard.cardNumber}
                        onChange={(e) => {
                            setPurchaseForm((prev) => ({
                                ...prev,
                                paymentCard: {
                                    ...prev.paymentCard,
                                    cardNumber: e.target.value,
                                },
                            }));
                        }}
                    />
                    <p className=" text-[red] text-xs">
                        {errors?.cardNumber ? errors.cardNumber[0] : ""}
                    </p>
                </label>
                <div className=" flex justify-start items-center gap-3">
                    <label htmlFor="expireMonth">
                        <select
                            name="expireMonth"
                            id="expireMonth"
                            className=" py-1 px-3 rounded-md"
                            value={purchaseForm.paymentCard.expireMonth}
                            onChange={(e) => {
                                setPurchaseForm((prev) => ({
                                    ...prev,
                                    paymentCard: {
                                        ...prev.paymentCard,
                                        expireMonth: e.target.value,
                                    },
                                }));
                            }}
                        >
                            <option value="" disabled>
                                MM
                            </option>
                            {Array(12)
                                .fill("#")
                                .map((_, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={
                                                index < 9
                                                    ? (
                                                          "0" +
                                                          (index + 1)
                                                      ).toString()
                                                    : (index + 1).toString()
                                            }
                                        >
                                            {index < 9
                                                ? ("0" + (index + 1)).toString()
                                                : (index + 1).toString()}
                                        </option>
                                    );
                                })}
                        </select>
                        <p className=" text-[red] text-xs">
                            {errors?.expireMonth ? errors.expireMonth[0] : ""}
                        </p>
                    </label>
                    <label htmlFor="expireYear">
                        <select
                            name="expireYear"
                            id="expireYear"
                            className=" py-1 px-3 rounded-md"
                            value={purchaseForm.paymentCard.expireYear}
                            onChange={(e) => {
                                setPurchaseForm((prev) => ({
                                    ...prev,
                                    paymentCard: {
                                        ...prev.paymentCard,
                                        expireYear: e.target.value,
                                    },
                                }));
                            }}
                        >
                            <option value="" disabled>
                                YY
                            </option>
                            {Array(24)
                                .fill("#")
                                .map((_, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={(
                                                2024 +
                                                Array(24).length -
                                                index -
                                                1
                                            ).toString()}
                                        >
                                            {2024 +
                                                Array(24).length -
                                                index -
                                                1}
                                        </option>
                                    );
                                })}
                        </select>
                        <p className=" text-[red] text-xs">
                            {errors?.expireYear ? errors.expireYear[0] : ""}
                        </p>
                    </label>
                    <label htmlFor="cvc" className="grow">
                        <input
                            type="tel"
                            name="cvc"
                            id="cvc"
                            maxLength={3}
                            placeholder="CVC ..."
                            className=" w-full py-1 px-3 rounded-md"
                            value={purchaseForm.paymentCard.cvc}
                            onChange={(e) => {
                                setPurchaseForm((prev) => ({
                                    ...prev,
                                    paymentCard: {
                                        ...prev.paymentCard,
                                        cvc: e.target.value,
                                    },
                                }));
                            }}
                        />
                        <p className=" text-[red] text-xs">
                            {errors?.cvc ? errors.cvc[0] : ""}
                        </p>
                    </label>
                </div>
                <div className=" w-2/3 m-auto flex gap-3">
                    <label htmlFor="installment">
                        <select
                            name="installment"
                            id="installment"
                            className="py-1 px-3 rounded-md"
                            value={purchaseForm.purchaseInfo.installment}
                            onChange={(e) => {
                                const selectedInstallment = parseInt(
                                    e.target.value,
                                    10,
                                ) as 1 | 2 | 3 | 6 | 9 | 12;
                                setPurchaseForm((prev) => ({
                                    ...prev,
                                    purchaseInfo: {
                                        ...prev.purchaseInfo,
                                        installment: selectedInstallment,
                                    },
                                }));
                            }}
                        >
                            <option value={1} disabled>
                                Taksit
                            </option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={6}>6</option>
                            <option value={9}>9</option>
                            <option value={12}>12</option>
                        </select>
                        <p className=" text-[red] text-xs">
                            {errors?.installment ? errors.installment[0] : ""}
                        </p>
                    </label>
                    <label htmlFor="currency">
                        <select
                            name="currency"
                            id="currency"
                            className=" py-1 px-3 rounded-md"
                            value={purchaseForm.purchaseInfo.currency}
                            onChange={(e) => {
                                setPurchaseForm((prev) => ({
                                    ...prev,
                                    purchaseInfo: {
                                        ...prev.purchaseInfo,
                                        currency: e.target.value as
                                            | "try"
                                            | "usd"
                                            | "eur",
                                    },
                                }));
                            }}
                        >
                            <option value="" disabled>
                                Currency
                            </option>
                            {["TRY", "USD", "EUR"].map((item) => {
                                return (
                                    <option
                                        key={item}
                                        value={item.toLowerCase()}
                                        className=" uppercase"
                                        style={{ fontVariant: "small-caps" }}
                                    >
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                        <p className=" text-[red] text-xs">
                            {errors?.currency ? errors.currency[0] : ""}
                        </p>
                    </label>
                </div>
            </div>
            <button
                type="button"
                className="c-btn bg-[orange] hover:bg-orange-500 text-white w-full"
                onClick={ValidateAndNext}
            >
                Next
            </button>
        </div>
    );
}

export default PaymentCardForm;
