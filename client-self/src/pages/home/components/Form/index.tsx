import { useEffect, useState, React } from "react";
import Tabs from "./components/Tabs";
import FormInputs from "./components/FormInputs";
import { z } from "zod";
import axiosInstance from "../../../../services/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../../../GlobalContext";

export type ActiveTabType = "login" | "signup";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4, {
        message: "Password must be at least 4 chars",
    }),
});
export const SignupSchema = z
    .object({
        username: z.string().min(3, {
            message: "Username must be at least 3 chars",
        }),
        email: z.string().email(),
        // role : z.string(),
        role: z.enum(["student", "instructer"], {
            message: "You must select a role",
        }),
        password: z.string().min(4, {
            message: "Password must be at least 4 chars",
        }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match !",
        path: ["confirmPassword"],
    });

export type LoginType = z.infer<typeof LoginSchema>;
export type SignupType = z.infer<typeof SignupSchema>;

export const initialLoginInfo = {
    email: "nuri@mail.com",
    password: "1234",
};

export const initialSignupInfo = {
    username: "nuri",
    email: "nuri@mail.com",
    role: "student",
    password: "1234",
    confirmPassword: "1234",
};

const ValidationErrorsSchema = z.object({
    username: z.string().array().optional(),
    email: z.string().array().optional(),
    role: z.string().array().optional(),
    password: z.string().array().optional(),
    confirmPassword: z.string().array().optional(),
});
export type ValidationErrorsType = z.infer<typeof ValidationErrorsSchema>;

function Form() {
    const [activeTab, setActiveTab] = useState<ActiveTabType>("login");
    const [loginInfo, setLoginInfo] = useState<LoginType>(initialLoginInfo);
    const [signupInfo, setSignupInfo] = useState<SignupType>(
        initialSignupInfo as SignupType,
    );
    const [validationErrors, setValidationErrors] =
        useState<ValidationErrorsType>({} as ValidationErrorsType);
    const [isUserIn, setIsUserIn] = useState<boolean>(false);
    const { setAuthenticated, setUser } = useGlobalContext();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setValidationErrors({});

        if (activeTab === "login") {
            const validationResult = LoginSchema.safeParse(loginInfo);

            if (validationResult.success) {
                const validLoginInfo = validationResult.data;

                const response = await axiosInstance.post(
                    "/login",
                    validLoginInfo,
                );

                sessionStorage.setItem(
                    "token",
                    JSON.stringify(response.data.token),
                );
                setIsUserIn(true);
            } else {
                setValidationErrors(
                    validationResult.error.flatten().fieldErrors,
                );
            }
        } else {
            const validationResult = SignupSchema.safeParse(signupInfo);

            if (validationResult.success) {
                const validSignupInfo = validationResult.data;
                try {
                    const response = await axiosInstance.post(
                        "/signup",
                        validSignupInfo,
                    );
                    toast.success(response.data.message);
                    sessionStorage.setItem(
                        "token",
                        JSON.stringify(response.data.token),
                    );
                    setIsUserIn(true);
                } catch (error) {
                    if (error instanceof AxiosError) {
                        console.log(error);

                        toast.error(error.response?.data.message);
                    } else {
                        console.log(error);
                        throw error;
                    }
                }
            } else {
                setValidationErrors(
                    validationResult.error.flatten().fieldErrors,
                );
            }
        }
    };

    const checkAuth = async () => {
        try {
            const response = await axiosInstance.get("/check-auth");
            setAuthenticated(true);
            setUser(response.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkAuth();
    }, [isUserIn]);

    return (
        <form
            className="space-y-4  border-2 rounded-lg shadow-lg py-8 px-16"
            onSubmit={handleSubmit}
        >
            <Tabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setValidationErrors={setValidationErrors}
                setLoginInfo={setLoginInfo}
                setSignupInfo={setSignupInfo}
            />
            <h2
                className=" text-xl font-bold capitalize text-center"
                style={{ fontVariant: "small-caps" }}
            >
                {activeTab === "login" ? "login" : "signup"}
            </h2>
            <FormInputs
                activeTab={activeTab}
                loginInfo={loginInfo}
                setLoginInfo={setLoginInfo}
                signupInfo={signupInfo}
                setSignupInfo={setSignupInfo}
                validationErrors={validationErrors}
            />
        </form>
    );
}

export default Form;
