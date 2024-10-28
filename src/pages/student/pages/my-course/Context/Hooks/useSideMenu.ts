import { useState } from "react";

const useSideMenu = () => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);

    const toggleSideMenu = () => {
        setIsSideMenuOpen((prev) => !prev);
    };

    return { isSideMenuOpen, toggleSideMenu };
};

export default useSideMenu;
