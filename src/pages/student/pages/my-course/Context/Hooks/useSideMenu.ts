import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../../../../GlobalContext";

const useSideMenu = () => {
    const { isSmallScreen } = useGlobalContext();

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);

    const toggleSideMenu = () => {
        setIsSideMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        if (isSmallScreen) {
            setIsSideMenuOpen(false);
        }
    }, [isSmallScreen]);

    return { isSideMenuOpen, toggleSideMenu };
};

export default useSideMenu;
