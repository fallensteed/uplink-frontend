import { mockUser1 } from "../../../common/api/user/user.mock";
import { mockPost1 } from "../mocks/post.mock";
import { formatCountComments, formatCountVotes, updateVotes } from "./posts";

beforeEach(() => fetchMock.resetMocks());

describe("fromatCountVotes()", () => {
    test("subtracts upvotes from downvotes", () => {
        const result = formatCountVotes(1, 1);
        expect(result).toEqual(0);
    });
});

describe("formatCountComments()", () => {
    test("returns 'Comments' if no comments", () => {
        const result = formatCountComments(0);
        expect(result).toEqual("Comments");
    });
    test("returns '1 Comment' if only one comment", () => {
        const result = formatCountComments(1);
        expect(result).toEqual("1 Comment");
    });
    test("returns 'X Comments' if only one comment", () => {
        const result = formatCountComments(3);
        expect(result).toEqual("3 Comments");
    });
});

describe("updateVotes()", () => {
    test("returns 'success' if successfully updates upvote", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ data: 1 }));
        const result = await updateVotes(
            mockPost1._id,
            mockPost1.upVotes,
            mockPost1.downVotes,
            mockUser1._id,
            "upVote",
        );
        expect(result).toEqual("success");
    });
    test("returns 'success' if successfully updates downvote", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ data: 1 }));
        const result = await updateVotes(
            mockPost1._id,
            mockPost1.upVotes,
            mockPost1.downVotes,
            mockUser1._id,
            "downVote",
        );
        expect(result).toEqual("success");
    });
    test("returns 'success' if successfully updates novote", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ data: 1 }));
        const result = await updateVotes(
            mockPost1._id,
            mockPost1.upVotes,
            mockPost1.downVotes,
            mockUser1._id,
            "noVote",
        );
        expect(result).toEqual("success");
    });
    test("returns failed if no response.data", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ message: "error" }));
        const result = await updateVotes(
            mockPost1._id,
            mockPost1.upVotes,
            mockPost1.downVotes,
            mockUser1._id,
            "downVote",
        );
        expect(result).toEqual("failed");
    });
});
