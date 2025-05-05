import { useEffect, useState } from "react";
import axiosInstance from "../../../../../../../services/axios";

import { useGlobalContext } from "../../../../../../GlobalContext";
import PaymentCardForm from "./Components/PaymentCardForm";
import { useStudentContext } from "../../../../Context";
import AddressForm from "./Components/AddressForm";
import ShippingAddressForm from "./Components/ShippingAddressForm";
import { CourseType } from "../../../../../../types/course";
import LoadingAnimation from "./Components/LoadingAnimation";

type PurchaseFormType = {
  course: CourseType;
  setIsPaymentFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function PurchaseForm({ course, setIsPaymentFormOpen }: PurchaseFormType) {
  const { user } = useGlobalContext();
  const { purchaseForm, setPurchaseForm } = useStudentContext();
  const [step, setStep] = useState(1);

  const [isProcesing, setIsProcesing] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    setPurchaseForm((prev) => ({
      ...prev,
      purchaseInfo: {
        ...prev.purchaseInfo,
        basketId: "bId" + new Date().getTime().toString() + user.id,
        conversationId: "cId" + new Date().getTime().toString() + user.id,
        price: course.pricing,
        paidPrice: course.pricing,
      },
      buyer: {
        ...prev.buyer,
        id: user.id,
        lastLoginDate: user.lastLoginDate || new Date().toDateString(),
      },
      billingAddress: {
        ...prev.billingAddress,
        contactName: prev.buyer.name,
        address: prev.buyer.registrationAddress,
        city: prev.buyer.city,
        country: prev.buyer.country,
      },
      basketItems: [
        {
          category1: "Online Lesson",
          id: course._id,
          itemType: "virtual",
          name: course.title,
          price: course.pricing,
        },
      ],
    }));
  }, [user, purchaseForm.buyer.registrationAddress]);

  const makePaymentRequest = async () => {
    setIsProcesing(true);

    try {
      const response = await axiosInstance.post("/payment/request", {
        purchaseForm,
        course: {
          courseId: course._id,
          title: course.title,
          intructerId: course.instructerId,
          instructerName: course.instructerName,
          courseImage: course.image,
        },
        student: {
          studentId: user.id,
          studentName: user.username,
          studentEmail: user.email,
        },
      });

      if (response.data.success) {
        setIsPurchased(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-black rounded-lg text-white py-3 px-9 md:w-[50%] md:max-w-[500px] space-y-3">
      <div className=" relative">
        <h1
          className=" md:text-center text-xl font-semibold"
          style={{ fontVariant: "small-caps" }}
        >
          Purchase Form
        </h1>
        <button
          type="button"
          className="c-btn bg-[red] hover:bg-red-500 text-white
                        absolute right-0 top-0
                    "
          style={{ fontVariant: "small-caps" }}
          onClick={() => setIsPaymentFormOpen(false)}
        >
          Cancel
        </button>
      </div>
      {!isProcesing ? (
        <form className=" ">
          {step === 1 ? (
            <PaymentCardForm setStep={setStep} />
          ) : step === 2 ? (
            <AddressForm setStep={setStep} />
          ) : (
            <ShippingAddressForm
              setStep={setStep}
              makePaymentRequest={makePaymentRequest}
            />
          )}
        </form>
      ) : (
        <LoadingAnimation isPurchased={isPurchased} courseId={course._id} />
      )}
    </div>
  );
}

export default PurchaseForm;
