import {
    ActiveTabType,
    initialLoginInfo,
    initialSignupInfo,
    LoginType,
    SignupType,
    ValidationErrorsType,
} from "../..";

type TabsType = {
    activeTab: ActiveTabType;
    setActiveTab: React.Dispatch<React.SetStateAction<ActiveTabType>>;
    setValidationErrors: React.Dispatch<
        React.SetStateAction<ValidationErrorsType>
    >;
    setLoginInfo: React.Dispatch<React.SetStateAction<LoginType>>;
    setSignupInfo: React.Dispatch<React.SetStateAction<SignupType>>;
};

function Tabs({
    activeTab,
    setActiveTab,
    setValidationErrors,
    setLoginInfo,
    setSignupInfo,
}: TabsType) {
    return (
        <div className=" rounded-md overflow-hidden w-full flex justify-center">
            <button
                type="button"
                className={` py-1 px-3 grow transition-all ${
                    activeTab === "login"
                        ? "bg-gray-200 font-semibold"
                        : "bg-gray-400 text-gray-200"
                }`}
                onClick={() => {
                    setActiveTab("login");
                    setValidationErrors({} as ValidationErrorsType);
                    setLoginInfo(initialLoginInfo);
                }}
                disabled={activeTab === "login"}
            >
                Login
            </button>
            <button
                type="button"
                className={` py-1 px-3 grow transition-all ${
                    activeTab === "signup"
                        ? "bg-gray-200 font-semibold"
                        : "bg-gray-400 text-gray-200"
                }`}
                onClick={() => {
                    setActiveTab("signup");
                    setValidationErrors({} as ValidationErrorsType);
                    setSignupInfo(initialSignupInfo);
                }}
                disabled={activeTab === "signup"}
            >
                Sign-Up
            </button>
        </div>
    );
}

export default Tabs;
