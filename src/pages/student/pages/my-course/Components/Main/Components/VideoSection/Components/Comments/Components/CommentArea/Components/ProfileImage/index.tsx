import { useGlobalContext } from "../../../../../../../../../../../../../../GlobalContext";

function ProfileImage() {
    const { user } = useGlobalContext();

    return (
        <div className="Image w-12 aspect-square rounded-full overflow-hidden">
            <img
                src={
                    user.image?.url ||
                    "/profile_pictures/ProfilePicturePlaceholder.webp"
                }
                alt=""
            />
        </div>
    );
}

export default ProfileImage;
