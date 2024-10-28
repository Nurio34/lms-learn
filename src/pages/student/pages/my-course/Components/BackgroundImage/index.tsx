function BackgroundImage() {
    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen opacity-50 -z-50"
            style={{
                backgroundImage: "url('/Lessons_Background.webp')",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
            }}
        ></div>
    );
}

export default BackgroundImage;
