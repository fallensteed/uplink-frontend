import { mockDeleteResponseSuccess, mockPatchResponseSuccess } from "../../../../common/api/responses/responses.mock";
import { mockPost1 } from "../../mocks/post.mock";
import {
    comment_deleteById,
    comment_getAll,
    comment_getAllByPost,
    comment_getById,
    comment_patchById,
    comment_postOne,
} from "./comment.api";
import { mockComment1, mockComment1Update, mockComment2 } from "./comment.mock";

beforeEach(() => {
    fetchMock.resetMocks();
});

test("comment_getAll()", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockComment1] }));
    const result = await comment_getAll();
    expect(result).toStrictEqual({ data: [mockComment1] });
});

test("comment_getAllByPost()", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockComment1] }));
    const result = await comment_getAllByPost(mockPost1._id);
    expect(result).toStrictEqual({ data: [mockComment1] });
});

test("comment_getById()", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockComment1 }));
    const result = await comment_getById(mockComment1._id);
    expect(result).toStrictEqual({ data: mockComment1 });
});

test("comment_postOne()", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockComment2 }));
    const result = await comment_postOne(mockComment2);
    expect(result).toStrictEqual({ data: mockComment2 });
});

test("comment_patchById()", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPatchResponseSuccess));
    const result = await comment_patchById(mockComment1Update);
    expect(result).toStrictEqual(mockPatchResponseSuccess);
});

test("comment_deleteById()", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDeleteResponseSuccess));
    const result = await comment_deleteById(mockComment1._id);
    expect(result).toStrictEqual(mockDeleteResponseSuccess);
});
