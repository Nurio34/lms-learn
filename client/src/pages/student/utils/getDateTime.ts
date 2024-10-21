const getDateTime = () => {
    const dateTime = new Date().toISOString();
    const date = dateTime.split("T")[0];
    const time = dateTime.split("T")[1].split(".")[0];

    console.log(date + " " + time);

    return date + " " + time;
};

export default getDateTime;
