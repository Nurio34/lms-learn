function BackgroundImage() {
    return (
        <div
            className=" fixed w-screen h-screen -z-50 opacity-20"
            style={{ backgroundImage: "url('public/hero_background.png')" }}
        ></div>
    );
}

export default BackgroundImage;
