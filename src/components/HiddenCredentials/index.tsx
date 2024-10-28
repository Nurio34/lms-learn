import { useState } from "react";
import { users } from "../../config/credentials";
import { IoIosArrowBack } from "react-icons/io";

function HiddenCredentials() {
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <div>
            <button className=" sr-only" onClick={() => setIsRevealed(true)}>
                Reveal
            </button>
            <ul
                className={`absolute top-0 left-0 transition-all bg-black text-white py-1 px-3 
                ${isRevealed ? "translate-x-0" : "-translate-x-full"}    
            `}
            >
                {users.map((user, index) => {
                    return (
                        <li key={index}>
                            {user.role} / {user.email} / {user.password}
                        </li>
                    );
                })}
                {isRevealed && (
                    <button
                        className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 bg-[orange] text-white p-2 rounded-tr-md rounded-br-md text-lg"
                        onClick={() => setIsRevealed(false)}
                    >
                        <IoIosArrowBack />{" "}
                    </button>
                )}
            </ul>
        </div>
    );
}

export default HiddenCredentials;
