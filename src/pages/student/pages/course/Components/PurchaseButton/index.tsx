import { useStudentContext } from "../../../../Context";
import getDateTime from "../../../../utils/getDateTime";

function PurchaseButton({
    setIsPaymentFormOpen,
}: {
    setIsPaymentFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { setPurchaseForm } = useStudentContext();

    return (
        <button
            type="button"
            className="c-btn bg-white text-black hover:bg-gray-200 "
            style={{ fontVariant: "small-caps" }}
            onClick={() => {
                setPurchaseForm((prev) => ({
                    ...prev,
                    buyer: { ...prev.buyer, registrationDate: getDateTime() },
                }));
                setIsPaymentFormOpen(true);
            }}
        >
            Buy Course
        </button>
    );
}

export default PurchaseButton;
