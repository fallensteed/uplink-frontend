import { User } from "common/api/user/user.api";
import { Community } from "../api/community/community.api";

export interface Post {
    _id: string;
    title: string;
    detail?: string;
    link?: string;
    imageSrc?: string;
    tags?: string[];
    community: string;
    draft: boolean;
    miniLink: string;
    upVotes: string[];
    downVotes: string[];
    commentCount: number;
    editHistory?: PostEditHistory[];
    userCreated: string;
    userCreatedNotifications: boolean;
    createdAt: string;
}

export interface PostPopulated {
    _id: string;
    title: string;
    detail?: string;
    link?: string;
    imageSrc?: string;
    tags?: string[];
    community: Community;
    draft: boolean;
    miniLink: string;
    upVotes?: string[];
    downVotes?: string[];
    commentCount: number;
    editHistory?: PostEditHistory[];
    userCreated: User;
    userCreatedNotifications: boolean;
    createdAt: string;
}

export interface PostEditHistory {
    title: string;
    detail: string;
    updatedAt: string;
}

export interface PostSendRequest {
    type?: PostRequestType;
    sort?: PostRequestSort;
    page?: number;
    id?: string;
    limit?: number;
}

export type PostRequestType = "community" | "saved" | "user" | "username" | null;
export type PostRequestSort = "newest" | "rating" | null;

export interface PostReceiveRequest {
    data: {
        docs: [PostPopulated];
        totalDocs: number;
        limit: number;
        totalPages: number;
        page: number;
        pagingCounter: number;
        hasPrevPage: boolean;
        hasNextPage: boolean;
        prevPage: number | null;
        nextPage: number | null;
    };
}
