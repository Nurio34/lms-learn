import { useEffect, useState } from "react";
import { CommentType } from "../../../../../../../../../../Context/Hooks/useComment";
import { UserType } from "../../../../../../../../../../../../../../GlobalContext";
import { AxiosError } from "axios";
import axiosInstance from "../../../../../../../../../../../../../../../services/axios";
import ProfilePicture from "./Components/ProfilePicture";
import NameAndTime from "./Components/NameAndTime";
import TheComment from "./Components/TheComment";
import CommentInterractions from "./Components/CommentInterractions";
import CommentArea from "../../../CommentArea";

function Comment({ comment }: { comment: CommentType }) {
    const [user, setUser] = useState({} as UserType);
    const [isReplying, setIsReplying] = useState(false);

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance(
                `/auth/get-user-info/${comment.studentId}`,
            );

            if (response.data.success) {
                setUser(response.data.user);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        getUserInfo();
        setIsReplying(false);
    }, []);

    return (
        <li className="flex gap-3">
            <ProfilePicture />
            <div className="grow">
                <NameAndTime
                    username={user.username}
                    commentTime={comment.updatedAt}
                />
                <TheComment comment={comment.comment} />
                <CommentInterractions
                    comment={comment}
                    setIsReplying={setIsReplying}
                />
                <div className="py-2">
                    <CommentArea isReplying={isReplying} />
                </div>
            </div>
        </li>
    );
}

export default Comment;
