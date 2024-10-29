import { useState } from "react";
import { useStudentContext } from "../../../../../Context";
import { BuyerSchema } from "../../../../../Types/payment";

function AddressForm({
    setStep,
}: {
    setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
    const { purchaseForm, setPurchaseForm } = useStudentContext();
    const [errors, setErrors] = useState<any>({});

    const ValidateAndNext = () => {
        const BuyerValidationResult = BuyerSchema.safeParse(purchaseForm.buyer);
        console.log(BuyerValidationResult);

        if (!BuyerValidationResult.success) {
            setErrors({
                ...BuyerValidationResult.error.flatten().fieldErrors,
            });
        }

        if (BuyerValidationResult.success) {
            setStep(3);
        }
    };

    return (
        <>
            <fieldset className=" text-black grid gap-3">
                <legend>Buyer Information</legend>
                <div className="space-y-3 md:space-y-0 md:flex gap-3">
                    <div>
                        <label htmlFor="name" className=" grow w-full">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name ..."
                                className=" py-1 px-3 rounded-md grow w-full"
                                value={purchaseForm.buyer.name}
                                onChange={(e) => {
                                    setPurchaseForm((prev) => ({
                                        ...prev,
                                        buyer: {
                                            ...prev.buyer,
                                            name: e.target.value,
                                        },
                                    }));
                                }}
                            />
                        </label>
                        <p className=" text-[red] text-xs">
                            {errors?.name ? errors.name[0] : ""}
                        </p>
                    </div>
                    <div>
                        <label htmlFor="surname" className=" grow w-full">
                            <input
                                type="text"
                                name="surname"
                                id="surname"
                                placeholder="Surname ..."
                                className=" py-1 px-3 rounded-md grow w-full"
                                value={purchaseForm.buyer.surname}
                                onChange={(e) => {
                                    setPurchaseForm((prev) => ({
                                        ...prev,
                                        buyer: {
                                            ...prev.buyer,
                                            surname: e.target.value,
                                        },
                                    }));
                                }}
                            />
                            <p className=" text-[red] text-xs">
                                {errors?.surname ? errors.surname[0] : ""}
                            </p>
                        </label>
                    </div>
                </div>
                <div className="space-y-3 md:space-y-0 md:flex gap-3">
                    <div>
                        <label
                            htmlFor="identityNumber"
                            className=" grow w-full"
                        >
                            <input
                                type="tel"
                                name="identityNumber"
                                id="identityNumber"
                                placeholder="Idendity Number ..."
                                className=" py-1 px-3 rounded-md grow w-full"
                                maxLength={11}
                                value={purchaseForm.buyer.identityNumber}
                                onChange={(e) => {
                                    setPurchaseForm((prev) => ({
                                        ...prev,
                                        buyer: {
                                            ...prev.buyer,
                                            identityNumber: e.target.value,
                                        },
                                    }));
                                }}
                            />
                            <p className=" text-[red] text-xs">
                                {errors?.identityNumber
                                    ? errors.identityNumber[0]
                                    : ""}
                            </p>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="gsmNumber" className=" grow w-full">
                            <input
                                type="tel"
                                name="gsmNumber"
                                id="gsmNumber"
                                placeholder="Gsm Number ..."
                                className=" py-1 px-3 rounded-md grow w-full"
                                maxLength={13}
                                value={purchaseForm.buyer.gsmNumber?.toString()}
                                onChange={(e) => {
                                    setPurchaseForm((prev) => ({
                                        ...prev,
                                        buyer: {
                                            ...prev.buyer,
                                            gsmNumber: e.target.value,
                                        },
                                    }));
                                }}
                            />
                            <p className=" text-[red] text-xs">
                                {errors?.gsmNumber ? errors.gsmNumber[0] : ""}
                            </p>
                        </label>
                    </div>
                </div>
                <div>
                    <label htmlFor="email">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email ..."
                            className=" py-1 px-3 rounded-md w-full"
                            value={purchaseForm.buyer.email}
                            onChange={(e) => {
                                setPurchaseForm((prev) => ({
                                    ...prev,
                                    buyer: {
                                        ...prev.buyer,
                                        email: e.target.value,
                                    },
                                }));
                            }}
                        />
                        <p className=" text-[red] text-xs">
                            {errors?.email ? errors.email[0] : ""}
                        </p>
                    </label>
                </div>
                <div className="flex gap-3">
                    <div>
                        <label htmlFor="country" className=" grow">
                            <input
                                type="text"
                                name="country"
                                id="country"
                                placeholder="Country ..."
                                className=" py-1 px-3 rounded-md grow"
                                value={purchaseForm.buyer.country}
                                onChange={(e) => {
                                    setPurchaseForm((prev) => ({
                                        ...prev,
                                        buyer: {
                                            ...prev.buyer,
                                            country: e.target.value,
                                        },
                                    }));
                                }}
                            />
                            <p className=" text-[red] text-xs">
                                {errors?.country ? errors.country[0] : ""}
                            </p>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="city" className=" grow">
                            <input
                                type="text"
                                name="city"
                                id="city"
                                placeholder="City ..."
                                className=" py-1 px-3 rounded-md grow"
                                value={purchaseForm.buyer.city}
                                onChange={(e) => {
                                    setPurchaseForm((prev) => ({
                                        ...prev,
                                        buyer: {
                                            ...prev.buyer,
                                            city: e.target.value,
                                        },
                                    }));
                                }}
                            />
                            <p className=" text-[red] text-xs">
                                {errors?.city ? errors.city[0] : ""}
                            </p>
                        </label>
                    </div>
                </div>
                <div>
                    <label htmlFor="registrationAddress" className=" w-full">
                        <textarea
                            name="registrationAddress"
                            id="registrationAddress"
                            rows={3}
                            placeholder="Address ..."
                            wrap="true"
                            className="py-1 px-3 rounded-md w-full"
                            value={purchaseForm.buyer.registrationAddress}
                            onChange={(e) => {
                                setPurchaseForm((prev) => ({
                                    ...prev,
                                    buyer: {
                                        ...prev.buyer,
                                        registrationAddress: e.target.value,
                                    },
                                }));
                            }}
                        ></textarea>
                    </label>
                    <p className=" text-[red] text-xs">
                        {errors?.registrationAddress
                            ? errors.registrationAddress[0]
                            : ""}
                    </p>
                </div>
            </fieldset>
            <div className="flex gap-3">
                <button
                    type="button"
                    className=" c-btn bg-[blue] hover:bg-blue-500 text-white grow"
                    onClick={() => setStep(1)}
                >
                    Previous
                </button>
                <button
                    type="button"
                    className=" c-btn bg-[orange] hover:bg-orange-500 text-white grow"
                    onClick={ValidateAndNext}
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default AddressForm;
