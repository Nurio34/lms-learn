import { ActiveTabType } from "../..";

type SubmitButtonType = {
    activeTab: ActiveTabType;
};

function SubmitButton({ activeTab }: SubmitButtonType) {
    return (
        <button
            type="submit"
            className=" bg-blue-500 w-full py-1 text-white font-semibold rounded-md capitalize transition-all
                hover:bg-blue-400
                active:scale-95
                disabled:bg-gray-400 disabled:text-gray-300
            "
            style={{ fontVariant: "small-caps" }}
        >
            {activeTab === "login" ? "login" : "register"}
        </button>
    );
}

export default SubmitButton;
