import { useEffect, useState } from "react";
import AuthTabs from "./Components/AuthTabs";
import SubmitButton from "./Components/SubmitButton";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../../../services/axios";
import { initialUser, useGlobalContext } from "../../GlobalContext";

function AuthPage() {
    const [activeTab, setActiveTab] = useState("signup");
    const [userInfo, setUserInfo] = useState({
        login: {
            email: "nuri@mail.com",
            password: "1234",
        },
        signup: {
            username: "nuri",
            email: "nuri@mail.com",
            password: "1234",
            confirmPassword: "1234",
        },
    });
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const { setAuthenticated, setUser } = useGlobalContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //! --- CHECK IF IS CONFIRMATION PASSWORD OK ---
        const isPasswordConfirmed =
            userInfo.signup.password === userInfo.signup.confirmPassword;

        if (!isPasswordConfirmed) {
            toast.error("Confirmation Password is not correct !");
            return;
        }
        //! --------------------------------------------

        //! --- SIGNUP ---
        if (activeTab === "signup") {
            try {
                const response = await axiosInstance.post(
                    "/auth/signup",
                    userInfo.signup,
                );
                toast.success(response.data.message);
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message);
                } else {
                    toast.error("Unexpecter Error occured. Please try again !");
                }
            }
        }
        //! --------------

        //! --- LOGIN ---
        else {
            try {
                const response = await axiosInstance.post(
                    "/auth/login",
                    userInfo.login,
                );
                toast.success(response.data.message);

                const token = response.data.token;
                sessionStorage.setItem("token", JSON.stringify(token));

                setIsLoggedIn(true);
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message);
                } else {
                    toast.error("Unexpecter Error occured. Please try again !");
                }
            }
        }
        //! -------------
    };

    const checkAuthorization = async () => {
        try {
            const response = await axiosInstance.get("/auth/check-auth");

            if (!response.data.success) {
                setAuthenticated(false);
                setUser(initialUser);

                return;
            } else {
                setAuthenticated(true);
                setUser(response.data.user);

                return;
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkAuthorization();
    }, [isLoggedIn]);

    return (
        <div className="flex justify-center items-center min-h-[600px] ">
            <form
                className="grid justify-items-center gap-3 border-2 py-8 px-16 rounded-lg shadow-md"
                onSubmit={handleSubmit}
            >
                <AuthTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    setUserInfo={setUserInfo}
                />
                <h2 className="  uppercase font-bold text-xl">
                    {activeTab === "login" ? "login" : "sign-up"}
                </h2>
                <div className="grid gap-2 ">
                    {activeTab === "signup" && (
                        <label
                            htmlFor="username"
                            className=" font-semibold flex items-center gap-3 text-end"
                        >
                            <span className=" min-w-36 ">Username</span>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter username..."
                                className=" border-2 py-1 px-3 rounded-md"
                                onChange={(e) => {
                                    setUserInfo((prevState) => {
                                        return {
                                            ...prevState,
                                            signup: {
                                                ...prevState.signup,
                                                username: e.target.value,
                                            },
                                        };
                                    });
                                }}
                                value={userInfo.signup.username}
                            />
                        </label>
                    )}

                    <label
                        htmlFor="email"
                        className=" font-semibold flex items-center gap-3 text-end"
                    >
                        <span className=" min-w-36 ">Email</span>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter email..."
                            className=" border-2 py-1 px-3 rounded-md"
                            onChange={(e) => {
                                if (activeTab === "login") {
                                    setUserInfo((prevState) => {
                                        return {
                                            ...prevState,
                                            login: {
                                                ...prevState.login,
                                                email: e.target.value,
                                            },
                                        };
                                    });
                                } else {
                                    setUserInfo((prevState) => {
                                        return {
                                            ...prevState,
                                            signup: {
                                                ...prevState.signup,
                                                email: e.target.value,
                                            },
                                        };
                                    });
                                }
                            }}
                            value={
                                activeTab === "login"
                                    ? userInfo.login.email
                                    : userInfo.signup.email
                            }
                        />
                    </label>
                    <label
                        htmlFor="password"
                        className=" font-semibold flex items-center gap-3 text-end"
                    >
                        <span className=" min-w-36 ">Password</span>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter password..."
                            className=" border-2 py-1 px-3 rounded-md"
                            onChange={(e) => {
                                if (activeTab === "login") {
                                    setUserInfo((prevState) => {
                                        return {
                                            ...prevState,
                                            login: {
                                                ...prevState.login,
                                                password: e.target.value,
                                            },
                                        };
                                    });
                                } else {
                                    setUserInfo((prevState) => {
                                        return {
                                            ...prevState,
                                            signup: {
                                                ...prevState.signup,
                                                password: e.target.value,
                                            },
                                        };
                                    });
                                }
                            }}
                            value={
                                activeTab === "login"
                                    ? userInfo.login.password
                                    : userInfo.signup.password
                            }
                        />
                    </label>
                    {activeTab === "signup" && (
                        <label
                            htmlFor="confirmPassword"
                            className=" font-semibold flex items-center gap-3 text-end"
                        >
                            <span className=" min-w-36 ">Confirm Password</span>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm the password..."
                                className=" border-2 py-1 px-3 rounded-md"
                                onChange={(e) => {
                                    setUserInfo((prevState) => {
                                        return {
                                            ...prevState,
                                            signup: {
                                                ...prevState.signup,
                                                confirmPassword: e.target.value,
                                            },
                                        };
                                    });
                                }}
                                value={userInfo.signup.confirmPassword}
                            />
                        </label>
                    )}
                </div>
                <SubmitButton userInfo={userInfo} />
            </form>
        </div>
    );
}

export default AuthPage;
