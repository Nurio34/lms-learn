import toast from "react-hot-toast";
import axiosInstance from "../../../../../services/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../../GlobalContext";

function ProfilePictureButton() {
    const { user, setUser } = useGlobalContext();
    const [profilePicture, setProfilePicture] = useState(
        "/profile_pictures/ProfilePicturePlaceholder.webp",
    );

    useEffect(() => {
        if (user.image?.url) {
            setProfilePicture(user.image.url);
        }
    }, [user]);

    const addProfilePicture = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files = e.target.files;

        if (!files) {
            toast.error(
                "Unexpected error while selecting profile picture ! Please try again ...",
            );
            return;
        }

        const imageData = files[0];
        const form = new FormData();
        form.append("file", imageData);

        //! *** FIRST DELETE THE PROFILE IMAGE FROM CLOUDINARY
        if (user.image?.public_id) {
            try {
                await axiosInstance.delete(
                    `/media/delete/${user.image?.public_id}`,
                );
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message);
                    return;
                } else {
                    toast.error(
                        "Unexpected error while deleting profile picture ! Please try again ...",
                    );
                }
            }
        }
        //! *************************************************

        //! *** THEN SAVE IMAGE TO CLOUDINARY then UPDATE MONGO USER DATA ***
        try {
            const response = await axiosInstance.post("/media/upload", form);

            if (response.data.success) {
                const clientUrl = URL.createObjectURL(imageData);
                setProfilePicture(clientUrl);
                const url = response.data.data.url;
                const public_id = response.data.data.public_id;
                const image = { url, public_id };
                try {
                    const response = await axiosInstance.patch(
                        "/auth/profile-picture",
                        image,
                    );

                    if (response.data.success) {
                        toast.success(response.data.message);
                        setUser(response.data.user);
                        localStorage.setItem(
                            "profilePicture",
                            JSON.stringify(response.data.user.image.url),
                        );
                    }
                } catch (error) {
                    if (error instanceof AxiosError) {
                        toast.error(error.response?.data.message);
                        return;
                    } else {
                        toast.error(
                            "Unexpected error while updating user profile ! Please try again ...",
                        );
                    }
                }
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
                return;
            } else {
                toast.error(
                    "Unexpected error while saving profile picture ! Please try again ...",
                );
            }
        }
        //! **************************************
    };

    return (
        <label
            htmlFor="profilePicture"
            className=" w-[14vw] md:max-w-14 aspect-square rounded-full overflow-hidden cursor-pointer"
        >
            <img src={profilePicture} alt="Profile image" />
            <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                className="hidden"
                onChange={addProfilePicture}
            />
        </label>
    );
}

export default ProfilePictureButton;
