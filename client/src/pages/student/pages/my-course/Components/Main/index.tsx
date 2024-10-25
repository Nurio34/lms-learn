import SideMenu from "./Components/SideMenu";
import VideoSection from "./Components/VideoSection";

function Main() {
    return (
        <main className="flex overflow-x-hidden">
            <VideoSection />
            <SideMenu />
        </main>
    );
}

export default Main;
