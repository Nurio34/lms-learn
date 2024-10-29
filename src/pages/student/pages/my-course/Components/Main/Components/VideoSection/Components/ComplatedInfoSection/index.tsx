import { useProgressContext } from "../../../../../../Context";
import Confetti from "react-confetti";

function ComplatedInfoSection() {
    const { isCourseComplated, progress, resetProgress } = useProgressContext();

    return (
        <>
            {isCourseComplated && !progress.isCourseComplatedOnce && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.8)] z-10">
                    <div
                        className="AnimatedShadow fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                            py-[4vh] px-[4vw] bg-white text-black rounded-lg shadow-lg text-center space-y-3
                        "
                    >
                        <h2 className=" c-subtitle">🎉Conguratulations🥳</h2>
                        <p>You've complated the course.</p>
                        <p>You are free to watch any lecture any time.</p>
                        <button
                            type="button"
                            className="c-btn bg-[green] hover:bg-green-500 text-white w-full"
                            onClick={resetProgress}
                        >
                            Ok
                        </button>
                    </div>
                    <Confetti />
                </div>
            )}
        </>
    );
}

export default ComplatedInfoSection;
