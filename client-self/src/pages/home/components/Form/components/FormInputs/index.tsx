import {
    ActiveTabType,
    LoginType,
    SignupType,
    ValidationErrorsType,
} from "../..";
import SubmitButton from "../SubmitButton";

type FormInputsType = {
    activeTab: ActiveTabType;
    loginInfo: LoginType;
    setLoginInfo: React.Dispatch<React.SetStateAction<LoginType>>;
    signupInfo: SignupType;
    setSignupInfo: React.Dispatch<React.SetStateAction<SignupType>>;
    validationErrors: ValidationErrorsType;
};

function FormInputs({
    activeTab,
    loginInfo,
    setLoginInfo,
    signupInfo,
    setSignupInfo,
    validationErrors,
}: FormInputsType) {
    return (
        <div className="space-y-2">
            {activeTab === "signup" && (
                <div>
                    <label
                        htmlFor="username"
                        className="flex gap-3 items-center justify-center"
                    >
                        <p className=" font-semibold w-36 text-end">Username</p>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter username..."
                            className=" py-1 px-4 border-[1px] rounded-md "
                            onChange={(e) => {
                                setSignupInfo((prev) => ({
                                    ...prev,
                                    username: e.target.value,
                                }));
                            }}
                            value={signupInfo.username}
                        />
                    </label>
                    <p className=" text-red-500 text-sm font-semibold min-w-36 text-end">
                        {validationErrors.username}
                    </p>
                </div>
            )}
            <div>
                <label
                    htmlFor="email"
                    className="flex gap-3 items-center justify-center"
                >
                    <p className=" font-semibold w-36 text-end">Email</p>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email..."
                        className=" py-1 px-4 border-[1px] rounded-md "
                        onChange={(e) => {
                            activeTab === "login"
                                ? setLoginInfo((prev) => ({
                                      ...prev,
                                      email: e.target.value,
                                  }))
                                : setSignupInfo((prev) => ({
                                      ...prev,
                                      email: e.target.value,
                                  }));
                        }}
                        value={
                            activeTab === "login"
                                ? loginInfo.email
                                : signupInfo.email
                        }
                    />
                </label>
                <p className=" text-red-500 text-sm font-semibold min-w-36 text-end">
                    {validationErrors.email}
                </p>
            </div>
            {activeTab === "signup" && (
                <div>
                    <label
                        htmlFor="role"
                        className="flex gap-3 items-center justify-center"
                    >
                        <p className=" font-semibold w-36 text-end">Role</p>
                        <select
                            name="role"
                            id="role"
                            className=" py-1 px-4 border-[1px] rounded-md grow "
                            onChange={(e) => {
                                setSignupInfo((prev) => ({
                                    ...prev,
                                    role: e.target.value as
                                        | "student"
                                        | "instructer",
                                }));
                            }}
                            value={signupInfo.role}
                        >
                            <option value="" disabled>
                                Select Role
                            </option>
                            <option value="student">Student</option>
                            <option value="instructer">Instructer</option>
                        </select>
                    </label>
                    <p className=" text-red-500 text-sm font-semibold min-w-36 text-end">
                        {validationErrors.role}
                    </p>
                </div>
            )}
            <div>
                <label
                    htmlFor="password"
                    className="flex gap-3 items-center justify-center"
                >
                    <p className=" font-semibold w-36 text-end">Password</p>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password..."
                        className=" py-1 px-4 border-[1px] rounded-md "
                        onChange={(e) => {
                            activeTab === "login"
                                ? setLoginInfo((prev) => ({
                                      ...prev,
                                      password: e.target.value,
                                  }))
                                : setSignupInfo((prev) => ({
                                      ...prev,
                                      password: e.target.value,
                                  }));
                        }}
                        value={
                            activeTab === "login"
                                ? loginInfo.password
                                : signupInfo.password
                        }
                    />
                </label>
                <p className=" text-red-500 text-sm font-semibold min-w-36 text-end">
                    {validationErrors.password}
                </p>
            </div>
            {activeTab === "signup" && (
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="flex gap-3 items-center justify-centerr"
                    >
                        <p className=" font-semibold w-36 text-end">
                            {" "}
                            Confirm Password
                        </p>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm your password..."
                            className=" py-1 px-4 border-[1px] rounded-m d"
                            onChange={(e) => {
                                setSignupInfo((prev) => ({
                                    ...prev,
                                    confirmPassword: e.target.value,
                                }));
                            }}
                            value={signupInfo.confirmPassword}
                        />
                    </label>
                    <p className=" text-red-500 text-sm font-semibold min-w-36 text-end">
                        {validationErrors.confirmPassword}
                    </p>
                </div>
            )}
            <SubmitButton activeTab={activeTab} />
        </div>
    );
}

export default FormInputs;
