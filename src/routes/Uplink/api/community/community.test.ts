import { mockPatchResponseSuccess, mockDeleteResponseSuccess } from "../../../../common/api/responses/responses.mock";
import { community_getAll, community_getById, community_postOne, community_patchById, community_deleteById } from "./community.api";
import { mockCommunity1, mockCommunity1Update, mockCommunity2 } from "./community.mock";


beforeEach(() => {
    fetchMock.resetMocks();
});

test("community_getAll()", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockCommunity1] }));
    const result = await community_getAll();
    expect(result).toStrictEqual({ data: [mockCommunity1] });
});

test("community_getById()", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockCommunity1 }));
    const result = await community_getById(mockCommunity1._id);
    expect(result).toStrictEqual({ data: mockCommunity1 });
});

test("community_postOne()", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockCommunity2 }));
    const result = await community_postOne(mockCommunity2);
    expect(result).toStrictEqual({ data: mockCommunity2 });
});

test("community_patchById()", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPatchResponseSuccess));
    const result = await community_patchById(mockCommunity1Update);
    expect(result).toStrictEqual(mockPatchResponseSuccess);
});

test("community_deleteById()", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDeleteResponseSuccess));
    const result = await community_deleteById(mockCommunity1._id);
    expect(result).toStrictEqual(mockDeleteResponseSuccess);
});