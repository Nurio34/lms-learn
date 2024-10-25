import { useState } from "react";

const useHeader = () => {
    const [headerHeight, setHeaderHeight] = useState(0);

    const getHeaderHeight = (num: number) => {
        setHeaderHeight(num);
    };

    return { headerHeight, getHeaderHeight };
};

export default useHeader;
