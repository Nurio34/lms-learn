import { useEffect, useRef, useState } from "react";

const useFullscreen = () => {
    const PlayerContainer = useRef<HTMLDivElement | null>(null);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

    const handleOnClickOnFullScreenButton = () => {
        if (PlayerContainer.current) {
            if (!isFullScreen) {
                // Request fullscreen
                PlayerContainer.current
                    .requestFullscreen()
                    .then(() => {
                        setIsFullScreen(true);
                        if (PlayerContainer.current) {
                            PlayerContainer.current.focus(); // Set focus
                        }
                    })
                    .catch((err) => {
                        console.error("Failed to enter fullscreen:", err);
                    });
            } else {
                // Exit fullscreen
                document.exitFullscreen(); // No need for .then()
                setIsFullScreen(false); // Update state immediately
            }
        }
    };

    useEffect(() => {
        const handleEvent = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsFullScreen(false);
            }
        };

        if (PlayerContainer.current && isFullScreen) {
            PlayerContainer.current.addEventListener("keydown", handleEvent);
        }

        // Cleanup
        return () => {
            if (PlayerContainer.current) {
                PlayerContainer.current.removeEventListener(
                    "keydown",
                    handleEvent,
                ); // Correctly removing keydown event
            }
        };
    }, [isFullScreen]); // Include isFullScreen in the dependency array

    return { PlayerContainer, isFullScreen, handleOnClickOnFullScreenButton };
};

export default useFullscreen;
