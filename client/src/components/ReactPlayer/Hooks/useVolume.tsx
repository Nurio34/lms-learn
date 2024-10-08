import { useEffect, useRef, useState } from "react";

export const useVolume = () => {
    //! *** HANDLE VOLUME CONTROL VISIBILITY ***
    const [isVolumeRangeVisible, setIsVolumRangeVisible] =
        useState<boolean>(false);

    const VolumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleOnClickVolumeButton = () => {
        if (VolumeTimeoutRef.current) {
            clearTimeout(VolumeTimeoutRef.current);
        }
        setIsVolumRangeVisible((prev) => !prev);
    };

    const handleOnMouseEnterToVolumeRange = () => {
        if (VolumeTimeoutRef.current) {
            clearTimeout(VolumeTimeoutRef.current);
        }
    };

    const handleOnMouseLeaveFromVolumeRange = () => {
        VolumeTimeoutRef.current = setTimeout(() => {
            setIsVolumRangeVisible(false);
        }, 1000);
    };
    //! *******************************************

    //! *** HANDLE VOLUME CHANGE ***
    const [volume, setVolume] = useState(0.1);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        if (volume === 0) {
            setIsMuted(true);
        } else {
            setIsMuted(false);
        }
    }, [volume]);

    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = Number(e.target.value);

        setVolume(vol / 100);
    };
    //! ****************************

    return {
        isVolumeRangeVisible,
        setIsVolumRangeVisible,
        handleOnClickVolumeButton,
        handleOnMouseEnterToVolumeRange,
        handleOnMouseLeaveFromVolumeRange,
        handleVolume,
        volume,
        isMuted,
    };
};
