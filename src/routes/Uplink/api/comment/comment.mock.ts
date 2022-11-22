import { mockUser1, mockUser2 } from "../../../../common/api/user/user.mock";
import { mockPost1 } from "../post/post.mock";
import { Comment } from "./comment.api";

export const mockComment1: Comment = {
    _id: "636d670dad533cc91bb299b6",
    text: "This is the first comment.",
    post: mockPost1._id,
    user: mockUser1._id,
    upVotes: [],
    downVotes: [mockUser2._id],
    editHistory: [],
};

export const mockComment2: Comment = {
    _id: "636d67e2c547b909546ff6eb",
    text: "This is the second comment.",
    post: mockPost1._id,
    user: mockUser1._id,
    upVotes: [],
    downVotes: [],
    editHistory: [],
};

export const mockSubComment1: Comment = {
    _id: "636d67fdd8aa34fa2d283d8a",
    text: "This is the first sub comment.",
    commentOn: mockComment1._id,
    post: mockPost1._id,
    user: mockUser1._id,
    upVotes: [],
    downVotes: [],
    editHistory: [],
};

export const mockComment1Update: Comment = {
    _id: "636d670dad533cc91bb299b6",
    text: "This is the first updated comment.",
    editHistory: [
        {
            text: "This is the first comment.",
            updatedAt: new Date(),
        },
    ],
} as Comment;

export const mockComment1Delete: Comment = {
    _id: "636d670dad533cc91bb299b6",
} as Comment;

export const mockCommentBadValidate = {
    _id: "badValidate",
};