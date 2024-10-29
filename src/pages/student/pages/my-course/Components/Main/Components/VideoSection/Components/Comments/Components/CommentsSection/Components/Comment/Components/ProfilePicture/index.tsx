function ProfilePicture({ commentOwnerImage }: { commentOwnerImage?: string }) {
    return (
        <picture>
            <div
                className="w-9 aspect-square rounded-full overflow-hidden relative bg-white"
                style={{ filter: "drop-shadow(0px 0px 7px white)" }}
            >
                <img
                    src={
                        commentOwnerImage ||
                        "/profile_pictures/ProfilePicturePlaceholder.webp"
                    }
                    alt="profile picture"
                    className="absolute w-[93%] top-[1%] left-[1%] aspect-square rounded-full object-cover"
                />
            </div>
        </picture>
    );
}

export default ProfilePicture;
