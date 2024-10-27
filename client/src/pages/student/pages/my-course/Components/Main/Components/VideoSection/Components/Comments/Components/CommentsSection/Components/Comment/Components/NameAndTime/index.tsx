function findTimeDiff(date: Date) {
    const diff = (new Date().getTime() - new Date(date).getTime()) / 1000;

    const secs = Math.floor(diff % 60);
    const mins = Math.floor((diff / 60) % 60);
    const hours = Math.floor((diff / 3600) % 24);

    if (hours === 0 && mins === 0) {
        return `${secs} seconds ago`;
    }

    if (hours === 0 && mins !== 0) {
        return `${mins} minutes ago`;
    }
    if (hours !== 0) {
        return `${hours} minutes ago`;
    }
}

function NameAndTime({
    username,
    commentTime,
}: {
    username: string;
    commentTime: Date;
}) {
    return (
        <div className="flex gap-6 items-center">
            <p className=" font-semibold">@{username}</p>
            <p className=" font-light text-sm">{findTimeDiff(commentTime)}</p>
        </div>
    );
}

export default NameAndTime;
