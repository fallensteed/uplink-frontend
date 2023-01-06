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
