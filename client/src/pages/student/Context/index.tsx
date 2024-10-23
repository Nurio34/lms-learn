import { createContext, useContext, useEffect } from "react";
import { CourseType } from "../../../types/course";
import useCourses from "./hooks/useCourses";
import useFilter, { FilterType } from "./hooks/useFilter";
import useSort, { SortType } from "./hooks/useSort";
import axiosInstance from "../../../../services/axios";
import { initialUser, useGlobalContext } from "../../../GlobalContext";
import {
    BasketItemsType,
    BillingAddressType,
    BuyerType,
    PaymentCardType,
    PurchaseInfoType,
    ShippingAddressType,
} from "../Types/payment";
import usePurchase from "./hooks/usePurchase";
import useMyCourses, { myCoursesType } from "./hooks/useMyCourses";
type PurchaseFormType = {
    purchaseInfo: PurchaseInfoType;
    paymentCard: PaymentCardType;
    buyer: BuyerType;
    shippingAddress: ShippingAddressType;
    billingAddress: BillingAddressType;
    basketItems: BasketItemsType;
};
type StudentContextType = {
    isLoading: boolean;
    courses: CourseType[];
    error: string;
    filter: FilterType;
    setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
    filteredCourses: CourseType[];
    setFilteredCourses: React.Dispatch<React.SetStateAction<CourseType[]>>;
    sort: SortType;
    setSort: React.Dispatch<React.SetStateAction<SortType>>;
    purchaseForm: PurchaseFormType;
    setPurchaseForm: React.Dispatch<React.SetStateAction<PurchaseFormType>>;
    isLoadingMyCourses: boolean;
    setIsLoadingMyCourses: React.Dispatch<React.SetStateAction<boolean>>;
    myCourses: myCoursesType;
    setMyCourses: React.Dispatch<React.SetStateAction<myCoursesType>>;
    errorMyCourses: string;
    setErrorMyCourses: React.Dispatch<React.SetStateAction<string>>;
};

const StudentContext = createContext({} as StudentContextType);

function StudentProvider({ children }: { children: React.ReactNode }) {
    const { setAuthenticated, user, setUser } = useGlobalContext();
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
    }, []);

    const { isLoading, courses, error } = useCourses(user);
    const { filter, setFilter, filteredCourses, setFilteredCourses } =
        useFilter(courses);
    const { sort, setSort } = useSort(setFilteredCourses);
    const { purchaseForm, setPurchaseForm } = usePurchase();
    const {
        isLoadingMyCourses,
        setIsLoadingMyCourses,
        myCourses,
        setMyCourses,
        errorMyCourses,
        setErrorMyCourses,
    } = useMyCourses();
    //! *** MY COURSES ***

    return (
        <StudentContext.Provider
            value={{
                isLoading,
                courses,
                error,
                filter,
                setFilter,
                filteredCourses,
                setFilteredCourses,
                sort,
                setSort,
                purchaseForm,
                setPurchaseForm,
                isLoadingMyCourses,
                setIsLoadingMyCourses,
                myCourses,
                setMyCourses,
                errorMyCourses,
                setErrorMyCourses,
            }}
        >
            {children}
        </StudentContext.Provider>
    );
}

export default StudentProvider;

export const useStudentContext = () => useContext(StudentContext);
