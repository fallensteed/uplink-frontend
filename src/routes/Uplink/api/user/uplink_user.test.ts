import { mockUser1 } from "../../../../common/api/user/user.mock";
import { mockCommunity1 } from "../../mocks/community.mock";
import {
    mockUplinkUser1,
    mockUplinkUser1Followers,
    mockUplinkUser1Following,
    mockUplinkUser1Update,
    mockUplinkUser2,
} from "../../mocks/uplink_user.mock";
import {
    uplink_user_getByUserId,
    uplink_user_getFollowing,
    uplink_user_getMember,
    uplink_user_getModerator,
    uplink_user_patch,
    uplink_user_postOne,
    uplink_user_self,
    uplink_user_self_2,
} from "./uplink_user.api";

beforeEach(() => fetchMock.resetMocks());

test("uplink_user_getMember", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockCommunity1] }));
    const response = await uplink_user_getMember(mockUser1.uplinkUsername);
    expect(response).toEqual({ data: [mockCommunity1] });
});

test("uplink_user_getModerator", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockCommunity1] }));
    const response = await uplink_user_getModerator(mockUser1.uplinkUsername);
    expect(response).toEqual({ data: [mockCommunity1] });
});

test("uplink_user_getByUserId", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    const response = await uplink_user_getByUserId(mockUser1._id);
    expect(response).toEqual({ data: mockUplinkUser1 });
});

test("uplink_user_self", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    const response = await uplink_user_self(mockUser1._id);
    expect(response).toEqual({ data: mockUplinkUser1 });
});

test("uplink_user_self2", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    const response = await uplink_user_self_2();
    expect(response).toEqual({ data: mockUplinkUser1 });
});

test("uplink_user_postOne", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser2 }));
    const response = await uplink_user_postOne(mockUplinkUser2);
    expect(response).toEqual({ data: mockUplinkUser2 });
});

test("uplink_user_patch", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ modifiedCount: 1 }));
    const response = await uplink_user_patch(mockUplinkUser1Update);
    expect(response).toEqual({ modifiedCount: 1 });
});

test("uplink_user_getFollowers", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1Followers }));
    const response = await uplink_user_getFollowing(mockUser1._id);
    expect(response).toEqual({ data: mockUplinkUser1Followers });
});

test("uplink_user_getFollowing", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1Following }));
    const response = await uplink_user_getFollowing(mockUser1._id);
    expect(response).toEqual({ data: mockUplinkUser1Following });
});
