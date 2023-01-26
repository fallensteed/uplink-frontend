import { mockUser1, mockUser2 } from "common/api/user/user.mock";
import { UplinkUser } from "../api/user/uplink_user.api";

export const mockUplinkUser1: UplinkUser = {
    _id: "63b5cc4c6c951fb114245bcc",
    userId: mockUser1._id,
    verificationStatus: "not-requested",
    displayName: "jdoe",
    default: "username",
};
export const mockUplinkUser1Requested: UplinkUser = {
    _id: "63b5cc4c6c951fb114245bcc",
    userId: mockUser1._id,
    verificationStatus: "requested",
    displayName: "jdoe",
    default: "username",
};
export const mockUplinkUser1Verified: UplinkUser = {
    _id: "63b5cc4c6c951fb114245bcc",
    userId: mockUser1._id,
    verificationStatus: "verified",
    displayName: "jdoe",
    default: "username",
};
export const mockUplinkUser2: UplinkUser = {
    _id: "63b5cd382c09d4af5d464259",
    userId: mockUser2._id,
    verificationStatus: "not-requested",
    displayName: "jdoe",
    default: "username",
};
export const mockUplinkUser1Update: UplinkUser = {
    _id: "63b5cc4c6c951fb114245bcc",
    verificationStatus: "requested",
} as UplinkUser;
export const mockUplinkUser1Followers = [mockUser2.uplinkUsername];
export const mockUplinkUser1Following = [mockUser2.uplinkUsername];
