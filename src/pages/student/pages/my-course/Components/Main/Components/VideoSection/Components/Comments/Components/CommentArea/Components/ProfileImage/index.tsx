import { useGlobalContext } from "../../../../../../../../../../../../../../GlobalContext";

function ProfileImage() {
    const { user } = useGlobalContext();

    return (
        <div
            className="Image w-12 aspect-square rounded-full overflow-hidden relative bg-white"
            style={{ filter: "drop-shadow(0px 0px 7px white)" }}
        >
            <img
                src={
                    user.image?.url ||
                    "/profile_pictures/ProfilePicturePlaceholder.webp"
                }
                alt="profile picture"
                className="absolute w-[93%] top-[1%] left-[1%] aspect-square rounded-full object-cover"
            />
        </div>
    );
}

export default ProfileImage;
