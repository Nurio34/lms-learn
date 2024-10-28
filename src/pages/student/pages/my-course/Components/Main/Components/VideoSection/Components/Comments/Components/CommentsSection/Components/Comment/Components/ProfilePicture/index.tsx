function ProfilePicture({ commentOwnerImage }: { commentOwnerImage?: string }) {
    return (
        <picture>
            <div className="w-9 aspect-square rounded-full overflow-hidden">
                <img
                    src={
                        commentOwnerImage ||
                        "/profile_pictures/ProfilePicturePlaceholder.webp"
                    }
                    alt=""
                />
            </div>
        </picture>
    );
}

export default ProfilePicture;
