import ActionButtons from "./Components/ActionButtons";

function Table() {
    const items = [
        ["course", "students", "revenue", "actions"],
        ["React Js Course", 100, 5000],
        ["Next.js with Firebase", 50, 2500],
    ];
    return (
        <div className=" py-3 space-y-3">
            {items.map((item, index) => {
                return (
                    <div
                        key={index}
                        className={`grid grid-cols-4 justify-items-center items-center 
                            ${index === 0 && "border-b-2 shadow-sm "}    
                        `}
                    >
                        {item.map((i, ind) => {
                            return (
                                <p
                                    key={ind}
                                    className={` capitalize
                                        ${ind === 0 && "justify-self-start"} ${
                                        ind === 3 && "justify-self-end"
                                    }`}
                                >
                                    {i}
                                </p>
                            );
                        })}
                        {index !== 0 && <ActionButtons />}
                    </div>
                );
            })}
        </div>
    );
}

export default Table;
