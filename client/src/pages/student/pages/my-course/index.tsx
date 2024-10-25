import Header from "./Components/Header";
import Main from "./Components/Main";
import ProgressContextProvider from "./Context";

function MyCoursePage() {
    return (
        <ProgressContextProvider>
            <Header />
            <Main />
        </ProgressContextProvider>
    );
}

export default MyCoursePage;
