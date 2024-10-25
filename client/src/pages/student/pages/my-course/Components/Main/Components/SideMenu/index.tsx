import { AnimatePresence, motion } from "framer-motion";
import { useProgressContext } from "../../../../Context";
import { useEffect, useRef, useState } from "react";

function SideMenu() {
    const { isSideMenuOpen, headerHeight } = useProgressContext();
    const [sideMenuHeight, setSideMenuHeight] = useState(headerHeight);
    const SideMenuRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (SideMenuRef.current) {
            const windowHeight = window.innerHeight;
            setSideMenuHeight(windowHeight - headerHeight - 33);
        }
    }, [isSideMenuOpen]);

    return (
        <AnimatePresence>
            {isSideMenuOpen && (
                <motion.aside
                    ref={SideMenuRef}
                    className=" border-2 border-l min-w-[500px]"
                    style={{ minHeight: sideMenuHeight }}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{
                        type: "tween",
                        duration: "0.3",
                    }}
                >
                    SideMenu
                </motion.aside>
            )}
        </AnimatePresence>
    );
}

export default SideMenu;
