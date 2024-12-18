import { useProgressContext } from "../../../../../../Context";
import CommentArea from "./Components/CommentArea";
import CommentsSection from "./Components/CommentsSection";

function Comments() {
    const { comments } = useProgressContext();

    return (
        <section className="py-1 px-3 space-y-3">
            <h2 className="c-s-title">{comments.length} Comments</h2>
            <CommentArea />
            <CommentsSection />
        </section>
    );
}

export default Comments;
