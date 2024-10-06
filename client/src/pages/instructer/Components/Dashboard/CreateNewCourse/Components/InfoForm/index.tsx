import { InfoFormControls } from "../../../../../../../config";

function InfoForm() {
    return (
        <form className=" space-y-3">
            {InfoFormControls.map((item) => {
                return (
                    <div>
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
                                />
                            ) : item.componentType === "select" ? (
                                <select
                                    name={item.name}
                                    id={item.name}
                                    className="border-2 py-1 px-3 rounded-md grow"
                                >
                                    {item.options?.map((option) => {
                                        return (
                                            <option value={option.id}>
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
