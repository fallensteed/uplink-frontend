import { mockComment1 } from "../api/comment/comment.mock";
import { updateVotes } from "./comments";

beforeEach(() => fetchMock.resetMocks());

describe("updateVotes()", () => {
    test("returns 'success' if successfully updates upvote", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ data: 1 }));
        const result = await updateVotes(
            mockComment1._id,
            mockComment1.upVotes,
            mockComment1.downVotes,
            mockComment1._id,
            "upVote",
        );
        expect(result).toEqual("success");
    });
    test("returns 'success' if successfully updates downvote", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ data: 1 }));
        const result = await updateVotes(
            mockComment1._id,
            mockComment1.upVotes,
            mockComment1.downVotes,
            mockComment1._id,
            "downVote",
        );
        expect(result).toEqual("success");
    });
    test("returns 'success' if successfully updates novote", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ data: 1 }));
        const result = await updateVotes(
            mockComment1._id,
            mockComment1.upVotes,
            mockComment1.downVotes,
            mockComment1._id,
            "noVote",
        );
        expect(result).toEqual("success");
    });
    test("returns failed if no response.data", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ message: "error" }));
        const result = await updateVotes(
            mockComment1._id,
            mockComment1.upVotes,
            mockComment1.downVotes,
            mockComment1._id,
            "downVote",
        );
        expect(result).toEqual("failed");
    });
});
