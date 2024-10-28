import { InfoFormControls } from "../../../../../../../config";
import { useInstructerContext } from "../../../../../InstructerContext";

function InfoForm() {
    const { infoForm, setInfoForm } = useInstructerContext();

    return (
        <form className=" space-y-3">
            {InfoFormControls.map((item, index) => {
                return (
                    <div key={index}>
                        <label
                            htmlFor={item.name}
                            className="flex gap-3 items-center"
                        >
                            <p className=" font-semibold text-lg min-w-[153px] text-end">
                                {item.label}
                            </p>
                            {item.componentType === "input" ? (
                                <input
                                    type={item.type}
                                    name={item.name}
                                    id={item.name}
                                    placeholder={item.placeholder}
                                    className="border-2 py-1 px-3 rounded-md grow"
                                    value={infoForm[item.name]}
                                    onChange={(e) =>
                                        setInfoForm((prev) => ({
                                            ...prev,
                                            [item.name]: e.target.value,
                                        }))
                                    }
                                />
                            ) : item.componentType === "select" ? (
                                <select
                                    name={item.name}
                                    id={item.name}
                                    className="border-2 py-1 px-3 rounded-md grow"
                                    value={infoForm[item.name]}
                                    onChange={(e) =>
                                        setInfoForm((prev) => ({
                                            ...prev,
                                            [item.name]: e.target.value,
                                        }))
                                    }
                                >
                                    {item.options?.map((option) => {
                                        return (
                                            <option
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.label}
                                            </option>
                                        );
                                    })}
                                </select>
                            ) : (
                                <textarea
                                    name={item.name}
                                    id={item.name}
                                    cols={30}
                                    rows={10}
                                    placeholder={item.placeholder}
                                    className="border-2 py-1 px-3 rounded-md grow"
                                    value={infoForm[item.name]}
                                    onChange={(e) =>
                                        setInfoForm((prev) => ({
                                            ...prev,
                                            [item.name]: e.target.value,
                                        }))
                                    }
                                ></textarea>
                            )}
                        </label>
                    </div>
                );
            })}
        </form>
    );
}

export default InfoForm;
