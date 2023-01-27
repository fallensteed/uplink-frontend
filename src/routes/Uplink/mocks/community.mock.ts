import { mockUser1 } from "common/api/user/user.mock";
import { Community, CommunityPopulated } from "../api/community/community.api";

export const mockCommunity1: Community = {
    _id: "636d597aa8f7c2408f4f6b26",
    name: "Test Community 1",
    about: "This is a test community for mock data",
    link: "TestCommunity1",
    public: true,
    members: ["604013826726407dcc527ece"],
    moderators: ["604013826726407dcc527ece"],
    rules: [
        {
            name: "Test Rule 1",
            detail: "This test rule is for mock data testing",
            order: 1,
        },
        {
            name: "Test Rule 2",
            detail: "This test rule is for mock data testing",
            order: 2,
        },
    ],
    pinnedPosts: [],
};

export const mockCommunity1Populated: CommunityPopulated = {
    _id: "636d597aa8f7c2408f4f6b26",
    name: "Test Community 1",
    about: "This is a test community for mock data",
    link: "TestCommunity1",
    public: true,
    members: [mockUser1],
    moderators: [mockUser1],
    rules: [
        {
            name: "Test Rule 1",
            detail: "This test rule is for mock data testing",
            order: 1,
        },
        {
            name: "Test Rule 2",
            detail: "This test rule is for mock data testing",
            order: 2,
        },
    ],
    pinnedPosts: [],
};

export const mockCommunity1PopulatedNonMember: CommunityPopulated = {
    _id: "636d597aa8f7c2408f4f6b26",
    name: "Test Community 1",
    about: "This is a test community for mock data",
    link: "TestCommunity1",
    public: true,
    members: [],
    moderators: [mockUser1],
    rules: [
        {
            name: "Test Rule 1",
            detail: "This test rule is for mock data testing",
            order: 1,
        },
        {
            name: "Test Rule 2",
            detail: "This test rule is for mock data testing",
            order: 2,
        },
    ],
    pinnedPosts: [],
};

export const mockCommunity2: Community = {
    _id: "636d5ecbdf403df9bb38d979",
    name: "Test Community 2",
    about: "This is a test community for mock data",
    link: "TestCommunity2",
    public: true,
    members: ["604013826726407dcc527ece"],
    moderators: ["604013826726407dcc527ece"],
    rules: [
        {
            name: "Test Rule 1",
            detail: "This test rule is for mock data testing",
            order: 1,
        },
    ],
    pinnedPosts: [],
};

export const mockCommunity1Update: Community = {
    _id: "636d5ecbdf403df9bb38d979",
    about: "This is an updated test community for mock data",
} as Community;

export const mockCommunity1Delete: Community = {
    _id: "636d5ecbdf403df9bb38d979",
} as Community;

export const mockCommunityBadValidate = {
    _id: "BadValidate",
};

export const mockCommunityList = [
    {
        _id: "637268fe0d6fe699ad309703",
        link: "News_and_Announcements",
    },
    {
        _id: "6372694591f091fc9100d6a5",
        link: "HQSF_S1",
    },
    {
        _id: "6372694983d1ffacb1977831",
        link: "HQSF_CTIO",
    },
    {
        _id: "6372694cab0e2af1ebc05710",
        link: "InterserviceTransfers",
    },
    {
        _id: "63726953f2196c5bb260fa8d",
        link: "SupraCoders",
    },
    {
        _id: "63726957e0f9f5d8098cd68d",
        link: "TalentManagement",
    },
    {
        _id: "6372695bb7598f4b7251c53f",
        link: "SpOC",
    },
    {
        _id: "6372695e31c453e2bd24806d",
        link: "SSC",
    },
    {
        _id: "637269629a8254e80cfb795d",
        link: "STARCOM",
    },
    {
        _id: "63726966b26a5b782c01ea00",
        link: "SpaceForceMemes",
    },
];
