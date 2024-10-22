import React, { useState } from "react";
import { useStudentContext } from "../../../../../Context";
import { ShippingAddressSchema } from "../../../../../Types/payment";

function ShippingAddressForm({
    setStep,
    makePaymentRequest,
}: {
    setStep: React.Dispatch<React.SetStateAction<number>>;
    makePaymentRequest: () => Promise<void>;
}) {
    const { purchaseForm, setPurchaseForm } = useStudentContext();
    const [errors, setErrors] = useState<any>([]);

    const ValidateAndComplate = () => {
        const ShippingAddressValidationResult = ShippingAddressSchema.safeParse(
            purchaseForm.shippingAddress,
        );

        if (!ShippingAddressValidationResult.success) {
            setErrors({
                ...ShippingAddressValidationResult.error.flatten().fieldErrors,
            });
        }

        if (ShippingAddressValidationResult.success) {
            makePaymentRequest();
        }
    };

    return (
        <fieldset className="grid gap-3">
            <legend
                className=" text-center font-semibold text-xl"
                style={{ fontVariant: "small-caps" }}
            >
                Shipping Address Form
            </legend>
            <div className="text-black">
                <label htmlFor="contactName">
                    <input
                        type="text"
                        name="contactName"
                        id="contactName"
                        placeholder="Contact Name ..."
                        className="py-1 px-3 rounded-md w-full"
                        value={purchaseForm.shippingAddress.contactName}
                        onChange={(e) => {
                            setPurchaseForm((prev) => ({
                                ...prev,
                                shippingAddress: {
                                    ...prev.shippingAddress,
                                    contactName: e.target.value,
                                },
                            }));
                        }}
                    />
                    <p className=" text-sm text-[red] font-bold">
                        {errors?.contactName ? errors.contactName[0] : ""}
                    </p>
                </label>
            </div>
            <div className=" flex gap-3">
                <div className="text-black">
                    <label htmlFor="country">
                        <input
                            type="text"
                            name="country"
                            id="country"
                            placeholder="County ..."
                            className="py-1 px-3 rounded-md w-full"
                            value={purchaseForm.shippingAddress.country}
                            onChange={(e) => {
                                setPurchaseForm((prev) => ({
                                    ...prev,
                                    shippingAddress: {
                                        ...prev.shippingAddress,
                                        country: e.target.value,
                                    },
                                }));
                            }}
                        />
                        <p className=" text-sm text-[red] font-bold">
                            {errors?.country ? errors.country[0] : ""}
                        </p>
                    </label>
                </div>
                <div className="text-black">
                    <label htmlFor="city">
                        <input
                            type="text"
                            name="city"
                            id="city"
                            placeholder="City ..."
                            className="py-1 px-3 rounded-md w-full"
                            value={purchaseForm.shippingAddress.city}
                            onChange={(e) => {
                                setPurchaseForm((prev) => ({
                                    ...prev,
                                    shippingAddress: {
                                        ...prev.shippingAddress,
                                        city: e.target.value,
                                    },
                                }));
                            }}
                        />
                        <p className=" text-sm text-[red] font-bold">
                            {errors?.city ? errors.city[0] : ""}
                        </p>
                    </label>
                </div>
            </div>
            <div className="text-black">
                <label htmlFor="address">
                    <textarea
                        rows={3}
                        name="address"
                        id="address"
                        placeholder="Address ..."
                        className="py-1 px-3 rounded-md w-full"
                        value={purchaseForm.shippingAddress.address}
                        onChange={(e) => {
                            setPurchaseForm((prev) => ({
                                ...prev,
                                shippingAddress: {
                                    ...prev.shippingAddress,
                                    address: e.target.value,
                                },
                            }));
                        }}
                    ></textarea>
                    <p className=" text-sm text-[red] font-bold">
                        {errors?.address ? errors.address[0] : ""}
                    </p>
                </label>
            </div>
            <div className="flex gap-3">
                <button
                    type="button"
                    className=" c-btn bg-[blue] hover:bg-blue-500 text-white grow"
                    onClick={() => setStep(2)}
                >
                    Previous
                </button>
                <button
                    type="button"
                    className=" c-btn bg-[orange] hover:bg-orange-500 text-white grow"
                    onClick={ValidateAndComplate}
                >
                    Complate
                </button>
            </div>
        </fieldset>
    );
}

export default ShippingAddressForm;
