const getFormattedTime = (time: number) => {
    const roundedTime = Math.round(time);

    let secs =
        roundedTime % 60 < 10
            ? `0${roundedTime % 60}`
            : (roundedTime % 60).toString();
    let mins =
        Math.floor((roundedTime / 60) % 60) < 10
            ? `0${Math.floor((roundedTime / 60) % 60)}`
            : Math.floor((roundedTime / 60) % 60).toString();
    let hours = Math.floor(roundedTime / 3600).toString();

    return hours === "0" ? `${mins}:${secs}` : `${hours}:${mins}:${secs}`;
};

export default getFormattedTime;
