beforeEach(() => fetchMock.resetMocks());
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplinkUser.mock";
import { mockPost1, mockPost2 } from "../mocks/post.mock";
import { savePost } from "./savedPosts";

test("adding a post to the saved list should return modifiedCount 1", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ modifiedCount: 1 }));
    const result = await savePost(mockUplinkUser1._id, mockUplinkUser1.savedPosts as string[], mockPost2._id);
    expect(result.modifiedCount).toBe(1);
});

test("removing a post to the saved list should return modifiedCount 1", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ modifiedCount: 1 }));
    const result = await savePost(mockUplinkUser1._id, mockUplinkUser1.savedPosts as string[], mockPost1._id);
    expect(result.modifiedCount).toBe(1);
});
