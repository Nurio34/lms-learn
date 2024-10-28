import { useEffect, useState } from "react";
import { filterOptions } from "../../../../../../config";
import { useGlobalContext } from "../../../../../../GlobalContext";
import { useStudentContext } from "../../../../Context";
import { FilterType } from "../../../../Context/hooks/useFilter";
import ResetFilterButton from "./ResetFilterButton";
import SortButton from "./SortButton";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function Filters() {
    const { isSmallScreen } = useGlobalContext();
    const { filter, setFilter } = useStudentContext();
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    useEffect(() => {
        if (!isSmallScreen) {
            setIsFiltersOpen(true);
        }
    }, [isSmallScreen]);

    return (
        <div
            className={`grid gap-3 absolute md:relative bg-white md:bg-transparent px-4 md:border-l-2 border-r-2 md:border-r-0 transition-all
            ${isFiltersOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
            <SortButton />
            <ul className="min-w-max space-y-3">
                {Object.entries(filterOptions).map(([key, val]) => {
                    return (
                        <li key={key}>
                            <h2
                                className=" font-semibold text-lg capitalize pl-3"
                                style={{ fontVariant: "small-caps" }}
                            >
                                {key}
                            </h2>
                            <ul>
                                {val.map((item) => {
                                    return (
                                        <label
                                            key={item.id}
                                            htmlFor={item.id}
                                            role="listitem"
                                            className=" flex items-center gap-2"
                                        >
                                            <input
                                                type="checkbox"
                                                name={item.id}
                                                id={item.id}
                                                checked={filter[
                                                    key as keyof FilterType
                                                ].includes(item.id)}
                                                onChange={() => {
                                                    setFilter((prev) => {
                                                        if (
                                                            filter[
                                                                key as keyof FilterType
                                                            ].includes(item.id)
                                                        ) {
                                                            return {
                                                                ...prev,
                                                                [key]: filter[
                                                                    key as keyof FilterType
                                                                ].filter(
                                                                    (i) =>
                                                                        i !==
                                                                        item.id,
                                                                ),
                                                            };
                                                        } else {
                                                            return {
                                                                ...prev,
                                                                [key]: [
                                                                    ...filter[
                                                                        key as keyof FilterType
                                                                    ],
                                                                    item.id,
                                                                ],
                                                            };
                                                        }
                                                    });
                                                }}
                                            />
                                            {item.label}
                                        </label>
                                    );
                                })}
                            </ul>
                        </li>
                    );
                })}
            </ul>
            <ResetFilterButton />
            {isSmallScreen && (
                <button
                    type="button"
                    className=" c-btn bg-[orange] absolute top-0 right-0 translate-x-full"
                    onClick={() => setIsFiltersOpen((prev) => !prev)}
                >
                    {!isFiltersOpen ? <FaAngleRight /> : <FaAngleLeft />}
                </button>
            )}
        </div>
    );
}

export default Filters;
