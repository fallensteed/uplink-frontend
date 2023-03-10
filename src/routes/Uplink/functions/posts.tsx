import { post_patchById } from "../api/post/post.api";

export const formatCountVotes = (upVotes: number, downVotes: number) => {
    return upVotes - downVotes;
};

export const formatCountComments = (count: number) => {
    if (count === 0) {
        return "Comments";
    } else {
        return `${count} Comment${count > 1 ? "s" : ""}`;
    }
};

export const updateVotes = async (
    postId: string,
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
        _id: postId,
        upVotes: updatedUpVotes,
        downVotes: updatedDownVotes,
    };

    // get database response
    const response = await post_patchById(data);
    if (response.data) return "success";
    else return "failed";
};
