import { useEffect, useState } from "react";
import axiosInstance from "../../../../../../../services/axios";

import { useGlobalContext } from "../../../../../../GlobalContext";
import PaymentCardForm from "./Components/PaymentCardForm";
import { useStudentContext } from "../../../../Context";
import AddressForm from "./Components/AddressForm";
import ShippingAddressForm from "./Components/ShippingAddressForm";

type PurchaseFormType = {
    price: string;
};

function PurchaseForm({ price }: PurchaseFormType) {
    const { user } = useGlobalContext();
    const { purchaseForm, setPurchaseForm } = useStudentContext();
    const [step, setStep] = useState(1);
    console.log(step);
    useEffect(() => {
        setPurchaseForm((prev) => ({
            ...prev,
            purchaseInfo: {
                ...prev.purchaseInfo,
                basketId: "bId" + new Date().getTime().toString() + user.id,
                conversationId:
                    "cId" + new Date().getTime().toString() + user.id,
                price,
                paidPrice: price,
            },
            buyer: {
                ...prev.buyer,
                id: user.id,
                lastLoginDate: user.lastLoginDate,
            },
        }));
    }, [user, purchaseForm.paymentCard.cardHolderName]);

    const makePaymentRequest = async () => {
        try {
            const response = await axiosInstance.post(
                "/payment/request",
                purchaseForm,
            );
            console.log({ response });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className=" bg-black rounded-lg text-white py-3 px-9 w-[50%] max-w-[500px] space-y-3">
            <h1
                className=" text-center text-xl font-semibold"
                style={{ fontVariant: "small-caps" }}
            >
                Purchase Form
            </h1>
            <form className=" ">
                {step === 1 ? (
                    <PaymentCardForm setStep={setStep} />
                ) : step === 2 ? (
                    <AddressForm setStep={setStep} />
                ) : (
                    <ShippingAddressForm />
                )}
            </form>
        </div>
    );
}

export default PurchaseForm;
