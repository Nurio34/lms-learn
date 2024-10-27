import { useProgressContext } from "../../../../../../../../Context";
import Comment from "./Components/Comment";

function CommentsSection() {
    const { comments } = useProgressContext();

    return (
        <section className="CommentsSection">
            <ul className=" space-y-4">
                {comments.map((comment) => {
                    return <Comment key={comment._id} comment={comment} />;
                })}
            </ul>
        </section>
    );
}

export default CommentsSection;
