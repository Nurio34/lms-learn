import { useRef, useState } from "react";

const useControlsVisibility = () => {
    const [isControlsVisible, setIsControlsVisible] = useState(false);

    const ControlsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const hideControls = () => {
        if (ControlsTimeout.current) {
            clearTimeout(ControlsTimeout.current);
        }

        ControlsTimeout.current = setTimeout(() => {
            setIsControlsVisible(false);
        }, 3900);
    };

    const showControls = () => {
        setIsControlsVisible(true);

        hideControls();
    };

    const showControlsInfinitly = () => {
        if (ControlsTimeout.current) {
            clearTimeout(ControlsTimeout.current);
            setIsControlsVisible(true);
        }
    };

    return {
        isControlsVisible,
        showControls,
        hideControls,
        showControlsInfinitly,
    };
};

export default useControlsVisibility;
