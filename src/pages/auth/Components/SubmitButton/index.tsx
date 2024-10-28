function SubmitButton({
    userInfo,
}: {
    userInfo: {
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
    };
}) {
    const isFormValid =
        (userInfo.login.email !== "" && userInfo.login.password !== "") ||
        (userInfo.signup.username !== "" &&
            userInfo.signup.email !== "" &&
            userInfo.signup.password !== "" &&
            userInfo.signup.confirmPassword !== "");

    return (
        <button
            type="submit"
            className=" bg-black w-full py-1 text-white rounded-md transition-all
            hover:bg-gray-800 disabled:bg-gray-200
        "
            disabled={!isFormValid}
        >
            Submit
        </button>
    );
}

export default SubmitButton;
