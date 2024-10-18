function PurchaseButton({
    setIsPaymentFormOpen,
}: {
    setIsPaymentFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <button
            type="button"
            className="c-btn bg-white text-black hover:bg-gray-200 "
            style={{ fontVariant: "small-caps" }}
            onClick={() => setIsPaymentFormOpen(true)}
        >
            Buy Course
        </button>
    );
}

export default PurchaseButton;
