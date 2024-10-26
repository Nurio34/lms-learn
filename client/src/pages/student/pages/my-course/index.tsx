import BackgroundImage from "./Components/BackgroundImage";
import Header from "./Components/Header";
import Main from "./Components/Main";
import ProgressContextProvider from "./Context";

function MyCoursePage() {
    return (
        <ProgressContextProvider>
            <BackgroundImage />
            <Header />
            <Main />
        </ProgressContextProvider>
    );
}

export default MyCoursePage;
