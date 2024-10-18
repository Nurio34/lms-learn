import { useEffect, useState } from "react";
import axiosInstance from "../../../../../../../services/axios";

import { useGlobalContext } from "../../../../../../GlobalContext";
import PaymentCardForm from "./Components/PaymentCardForm";
import { useStudentContext } from "../../../../Context";
import AddressForm from "./Components/AddressForm";

type PurchaseFormType = {
    price: string;
};

function PurchaseForm({ price }: PurchaseFormType) {
    const { user } = useGlobalContext();
    const { purchaseForm, setPurchaseForm } = useStudentContext();
    const [step, setStep] = useState(1);

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
        }));
    }, [user]);

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
            <h1>PurchaseForm</h1>
            <form className=" ">
                {step === 1 ? (
                    <PaymentCardForm setStep={setStep} />
                ) : step === 2 ? (
                    <AddressForm />
                ) : null}
            </form>
        </div>
    );
}

export default PurchaseForm;
