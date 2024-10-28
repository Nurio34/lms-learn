import { useGlobalContext } from "../../../../../../GlobalContext";

function Hero() {
    const heroTexts = [
        "Discover courses** designed to help you succeed in your career**. Learn at your own pace, anytime, anywhere.",
        "Explore** a wide range of courses** taught by industry experts. Take the first step towards a brighter future today.",
        "Access top-quality courses** from world-class instructors. Start learning now and gain the skills** you need to thrive.",
        "From coding to marketing, find courses** to match your goals. Join a community of learners and achieve your dreams**.",
        "Whether you’re a beginner** or looking to advance**, we’ve got courses** tailored just for you. Start learning and reach new heights.",
    ];

    const colors = [
        { from: "#FF5733 ", to: "#33C3FF " },
        { from: "#1E88E5   ", to: "#FFB300   " },
        { from: "#FFCA28 ", to: "#3E50B4 " },
        { from: "#8D6E63 ", to: "#FFC107 " },
        { from: "#4CAF50 ", to: "#FF4081 " },
    ];

    const { headerHeight, isSmallScreen } = useGlobalContext();

    const windowHe = window.innerHeight - headerHeight;

    const fontStaticValue = isSmallScreen ? 8 : 16;

    return (
        <section
            className="grid md:grid-cols-2 gap-3 py-[1vh] px-[4vw]"
            style={{ minHeight: windowHe }}
        >
            <div className=" self-center">
                <h1
                    className=" text-2xl md:text-6xl pb-[4vh] font-bold md:max-w-[15ch]"
                    style={{ fontVariant: "small-caps" }}
                >
                    Empower Your Learning Journey
                </h1>
                <ul className="space-y-[2vh]">
                    {heroTexts.map((text, index) => (
                        <li
                            key={index}
                            className={`text-transparent ${
                                index % 2 === 1
                                    ? " text-end md:pl-20"
                                    : "md:pr-20"
                            }
                                
                            `}
                            style={{
                                fontSize: `${
                                    fontStaticValue +
                                    (heroTexts.length - index) * 2
                                }px`,
                                fontWeight: `${
                                    (heroTexts.length - index + 4) * 100
                                }`,
                                background: `linear-gradient(45deg, ${colors[index].from}, ${colors[index].to})`,
                                backgroundClip: "text",
                            }}
                        >
                            {text.split(" ").map((word, ind) => {
                                if (word.includes("**")) {
                                    return (
                                        <span
                                            key={ind}
                                            className=" shadow-md"
                                            style={{
                                                borderBottom: `${
                                                    heroTexts.length - index
                                                }px solid ${colors[index].to}`,
                                            }}
                                        >
                                            {word.split("**")[0]}{" "}
                                        </span>
                                    );
                                }
                                return <span key={ind}>{word} </span>;
                            })}
                        </li>
                    ))}
                </ul>
            </div>

            <figure className=" rounded-xl overflow-hidden">
                <picture>
                    <source media="(min-width: 1225px)" srcSet="/hero.webp" />

                    <img
                        src="/hero_small_screen.webp"
                        alt="Description of the image"
                        className=" h-full"
                    />
                </picture>
            </figure>
        </section>
    );
}

export default Hero;
