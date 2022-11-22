import { mockDeleteResponseSuccess, mockPatchResponseSuccess } from "../../../../common/api/responses/responses.mock";
import { mockCommunity1 } from "../community/community.mock";
import {
    post_deleteById,
    post_getAll,
    post_getAllByCommunity,
    post_getByMiniLink,
    post_patchById,
    post_postOne,
} from "./post.api";
import { mockPost1, mockPost1Update, mockPost2 } from "./post.mock";

beforeEach(() => {
    fetchMock.resetMocks();
});

test("post_getAll()", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockPost1] }));
    const result = await post_getAll();
    expect(result).toStrictEqual({ data: [mockPost1] });
});

test("post_getByMiniLink()", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockPost1 }));
    const result = await post_getByMiniLink(mockPost1.miniLink);
    expect(result).toStrictEqual({ data: mockPost1 });
});

test("post_getAllByCommunity()", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockPost1] }));
    const result = await post_getAllByCommunity(mockCommunity1._id);
    expect(result).toStrictEqual({ data: [mockPost1] });
});

test("post_postOne()", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockPost2] }));
    const result = await post_postOne(mockPost2);
    expect(result).toStrictEqual({ data: [mockPost2] });
});

test("post_patchById()", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPatchResponseSuccess));
    const result = await post_patchById(mockPost1Update);
    expect(result).toStrictEqual(mockPatchResponseSuccess);
});

test("post_deleteById()", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDeleteResponseSuccess));
    const result = await post_deleteById(mockPost1._id);
    expect(result).toStrictEqual(mockDeleteResponseSuccess);
});
