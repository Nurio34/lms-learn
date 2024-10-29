function BackgroundImage() {
    return (
        <div
            className=" fixed top-0 left-0 w-screen h-screen -z-50 opacity-20"
            style={{ backgroundImage: "url('/hero_background.png')" }}
        ></div>
    );
}

export default BackgroundImage;
