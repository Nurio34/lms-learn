function AuthTabs({
    activeTab,
    setActiveTab,
    setUserInfo,
}: {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    setUserInfo: React.Dispatch<
        React.SetStateAction<{
            login: {
                email: string;
                password: string;
            };
            signup: {
                username: string;
                email: string;
                password: string;
                confirmPassword: string;
            };
        }>
    >;
}) {
    return (
        <div className="w-full flex rounded-md border-2 overflow-hidden">
            <button
                type="button"
                value={activeTab}
                className={`py-1 px-3 w-full transition-all ${
                    activeTab === "login"
                        ? "bg-gray-100 text-lg "
                        : "bg-gray-300 text-gray-400"
                }`}
                onClick={() => {
                    setActiveTab("login");
                    // setUserInfo({
                    //     login: {
                    //         email: "",
                    //         password: "",
                    //     },
                    //     signup: {
                    //         username: "",
                    //         email: "",
                    //         password: "",
                    //         confirmPassword: "",
                    //     },
                    // });
                }}
            >
                Login
            </button>
            <button
                type="button"
                className={`py-1 px-3 w-full transition-all ${
                    activeTab === "signup"
                        ? "bg-gray-100 text-lg "
                        : "bg-gray-300 text-gray-400"
                }`}
                onClick={() => {
                    setActiveTab("signup");
                    // setUserInfo({
                    //     login: {
                    //         email: "",
                    //         password: "",
                    //     },
                    //     signup: {
                    //         username: "",
                    //         email: "",
                    //         password: "",
                    //         confirmPassword: "",
                    //     },
                    // });
                }}
            >
                Sign-up
            </button>
        </div>
    );
}

export default AuthTabs;
