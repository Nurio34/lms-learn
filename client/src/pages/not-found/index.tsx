import { useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className=" min-h-[700px] grid place-content-center gap-y-4">
            <img src="/monkey.png" className=" justify-self-center" />
            <p>Sanırım yolunu kaybettin. Yardımcı olalım</p>
            <button
                type="button"
                className=" bg-green-500 text-white font-bold py-1 px-3 rounded-md transition-all
                    hover:bg-green-400 hover:scale-105 active:scale-95
                "
                onClick={() => navigate("/auth")}
            >
                Yardım
            </button>
        </div>
    );
}

export default NotFoundPage;
