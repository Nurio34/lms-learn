import { filterOptions } from "../../../../../../config";
import { useStudentContext } from "../../../../Context";
import { FilterType } from "../../../../Context/hooks/useFilter";
import ResetFilterButton from "./ResetFilterButton";
import SortButton from "./SortButton";

function Filters() {
    const { filter, setFilter } = useStudentContext();

    return (
        <div className=" space-y-3">
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
        </div>
    );
}

export default Filters;
