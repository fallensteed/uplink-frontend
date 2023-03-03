import { mockUser1, mockUser2 } from "../../../common/api/user/user.mock";
import { Post } from "../api/post/post.api";
import { PostPopulated } from "../types/post.interface";
import { mockCommunity1 } from "./community.mock";

export const mockPost1: Post = {
    _id: "636d57d4d81b345a5f0d2def",
    title: "test post 1",
    detail: "this is a test post that was created for mock data",
    link: "https://www.google.com",
    tags: ["test"],
    community: "636d597aa8f7c2408f4f6b26",
    draft: false,
    miniLink: "abcdef",
    upVotes: [],
    downVotes: [],
    commentCount: 10,
    editHistory: [],
    userCreated: "604013826726407dcc527ece",
    userCreatedNotifications: true,
    createdAt: "2022-01-01T00:00:00.000Z",
};
export const mockPost1Populated: PostPopulated = {
    _id: "636d57d4d81b345a5f0d2def",
    title: "test post 1",
    detail: "this is a test post that was created for mock data",
    link: "https://www.google.com",
    imageSrc: "https://www.google.com",
    tags: ["test"],
    community: mockCommunity1,
    draft: false,
    miniLink: "abcdef",
    upVotes: [],
    downVotes: [],
    commentCount: 10,
    editHistory: [],
    userCreated: mockUser1,
    userCreatedNotifications: true,
    createdAt: "2022-01-01T00:00:00.000Z",
};
export const mockPost1PopulatedUpdated: PostPopulated = {
    _id: "636d57d4d81b345a5f0d2def",
    title: "test post 1",
    detail: "this is a test post that was created for mock data",
    link: "https://www.google.com",
    imageSrc: "https://www.google.com",
    tags: ["test"],
    community: mockCommunity1,
    draft: false,
    miniLink: "abcdef",
    upVotes: [mockUser1._id],
    downVotes: [],
    commentCount: 10,
    editHistory: [],
    userCreated: mockUser1,
    userCreatedNotifications: true,
    createdAt: "2022-01-01T00:00:00.000Z",
};

export const mockPost2: Post = {
    _id: "636d5e94c030b925fbd7d4da",
    title: "test post 2",
    detail: "this is a test post that was created for mock data",
    link: "https://www.supracoders.us",
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwO2hGTNvGOhlskhGZN3lhWOiTYL9-Yf_hA&usqp=CAU",
    tags: ["test"],
    community: "636d597aa8f7c2408f4f6b26",
    draft: false,
    miniLink: "abcdef",
    upVotes: ["604013826726407dcc527ece"],
    downVotes: [],
    commentCount: 0,
    editHistory: [],
    userCreated: "604013826726407dcc527ece",
    userCreatedNotifications: true,
    createdAt: "2022-01-01T00:00:00.000Z",
};

export const mockPost2Populated: PostPopulated = {
    _id: "636d5e94c030b925fbd7d4da",
    title: "test post 2",
    detail: "this is a test post that was created for mock data",
    tags: ["test"],
    community: mockCommunity1,
    draft: false,
    miniLink: "abcdef",
    upVotes: [mockUser2._id],
    downVotes: [],
    commentCount: 0,
    editHistory: [],
    userCreated: mockUser1,
    userCreatedNotifications: true,
    createdAt: "2022-01-01T00:00:00.000Z",
};

export const mockPost2PopulatedUpdated: PostPopulated = {
    _id: "636d5e94c030b925fbd7d4da",
    title: "test post 2",
    detail: "this is a test post that was created for mock data",
    tags: ["test"],
    community: mockCommunity1,
    draft: false,
    miniLink: "abcdef",
    upVotes: [mockUser1._id, mockUser2._id],
    downVotes: [],
    commentCount: 0,
    editHistory: [],
    userCreated: mockUser1,
    userCreatedNotifications: true,
    createdAt: "2022-01-01T00:00:00.000Z",
};

export const mockPost3: Post = {
    _id: "636d5e94c030b925fbd7d4da",
    title: "test post 3",
    detail: "this is a test post that was created for mock data",
    link: "https://www.supracoders.us",
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwO2hGTNvGOhlskhGZN3lhWOiTYL9-Yf_hA&usqp=CAU",
    tags: ["test"],
    community: "636d597aa8f7c2408f4f6b26",
    draft: false,
    miniLink: "abcdef",
    upVotes: ["604013826726407dcc527ece"],
    downVotes: [],
    commentCount: 1,
    editHistory: [],
    userCreated: "604013826726407dcc527ece",
    userCreatedNotifications: true,
    createdAt: "2022-01-01T00:00:00.000Z",
};

export const mockPost3Populated: PostPopulated = {
    _id: "636d5e94c030b925fbd7d4da",
    title: "test post 3",
    detail: "this is a test post that was created for mock data",
    link: "https://www.supracoders.us",
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwO2hGTNvGOhlskhGZN3lhWOiTYL9-Yf_hA&usqp=CAU",
    tags: ["test"],
    community: mockCommunity1,
    draft: false,
    miniLink: "abcdef",
    upVotes: ["604013826726407dcc527ece"],
    downVotes: [],
    commentCount: 1,
    editHistory: [],
    userCreated: mockUser1,
    userCreatedNotifications: true,
    createdAt: "2022-01-01T00:00:00.000Z",
};

export const mockPost4: Post = {
    _id: "636d5e94c030b925fbd7d4da",
    title: "test post 4",
    detail: "this is a test post that was created for mock data",
    link: "https://www.supracoders.us",
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwO2hGTNvGOhlskhGZN3lhWOiTYL9-Yf_hA&usqp=CAU",
    tags: ["test"],
    community: "636d597aa8f7c2408f4f6b26",
    draft: false,
    miniLink: "abcdef",
    upVotes: ["604013826726407dcc527ece"],
    downVotes: [],
    commentCount: 0,
    editHistory: [],
    userCreated: "604013826726407dcc527ece",
    userCreatedNotifications: true,
    createdAt: "2022-01-01T00:00:00.000Z",
};

export const mockPost1Update = {
    _id: "636d57d4d81b345a5f0d2def",
    detail: "this is an updated test post that was updated for mock data",
    editHistory: [
        {
            title: "test post 1",
            detail: "this is a test post that was created for mock data",
            updatedAt: new Date(),
        },
    ],
};

export const mockPostBadValidate = {
    _id: "badValidate",
};

export const MockPost1Delete = {
    _id: "636d57d4d81b345a5f0d2def",
};
