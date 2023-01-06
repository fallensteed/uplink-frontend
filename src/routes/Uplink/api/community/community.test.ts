import { mockDeleteResponseSuccess, mockPatchResponseSuccess } from "../../../../common/api/responses/responses.mock";
import { mockCommunity1, mockCommunity1Update, mockCommunity2 } from "../../mocks/community.mock";
import {
    community_deleteById,
    community_getAll,
    community_getByIdOrLink,
    community_patchById,
    community_postOne,
} from "./community.api";

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
    const result = await community_getByIdOrLink(mockCommunity1._id);
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
