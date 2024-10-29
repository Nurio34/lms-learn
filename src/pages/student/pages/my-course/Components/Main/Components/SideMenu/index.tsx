import { AnimatePresence, motion } from "framer-motion";
import { useProgressContext } from "../../../../Context";
import { useEffect, useRef, useState } from "react";
import LecturesList from "./Components/LecturesList";
import ProgressIndicator from "./Components/ProgressIndicator";
import Buttons from "./Components/Buttons";

function SideMenu() {
    const { isSideMenuOpen, headerHeight } = useProgressContext();
    const [sideMenuHeight, setSideMenuHeight] = useState(headerHeight);
    const SideMenuRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (SideMenuRef.current) {
            const windowHeight = window.innerHeight;
            setSideMenuHeight(windowHeight - headerHeight - 32);
        }
    }, [isSideMenuOpen, headerHeight]);

    return (
        <AnimatePresence>
            {isSideMenuOpen && (
                <motion.aside
                    ref={SideMenuRef}
                    className=" shadow-lg py-1 pl-3 pr-9 bg-white md:bg-[rgba(255,255,255,0.8)] absolute  right-0 md:relative"
                    style={{ minHeight: sideMenuHeight }}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{
                        type: "tween",
                        duration: "0.3",
                    }}
                >
                    <h2 className="c-subtitle">Lectures</h2>
                    <div className="flex">
                        <LecturesList />
                        <ProgressIndicator />
                    </div>
                    <Buttons />
                </motion.aside>
            )}
        </AnimatePresence>
    );
}

export default SideMenu;
