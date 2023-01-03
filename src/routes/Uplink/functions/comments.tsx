import { comment_patchById } from "../api/comment/comment.api";

export const updateVotes = async (
    commentId: string,
    upVotes: string[],
    downVotes: string[],
    newVote: string,
    change: "upVote" | "downVote" | "noVote",
) => {
    // clear votes
    const updatedUpVotes = upVotes.filter((vote) => vote !== newVote);
    const updatedDownVotes = downVotes.filter((vote) => vote !== newVote);

    // add new votes
    if (change === "upVote") {
        updatedUpVotes.push(newVote);
    } else if (change === "downVote") {
        updatedDownVotes.push(newVote);
    }

    // send all votes
    const data = {
        _id: commentId,
        upVotes: updatedUpVotes,
        downVotes: updatedDownVotes,
    };

    // get database response
    const response = await comment_patchById(data);
    if (response.data) return "success";
    else return "failed";
};
