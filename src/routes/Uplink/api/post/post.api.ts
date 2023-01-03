/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "common/api/user/user.api";
import { API_URL } from "../../../../config/api";
import { Community } from "../community/community.api";

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

export const UPLINK_POST_URL = `${API_URL}/uplink/post`;

export const post_getAll = async (): Promise<any> => {
    const response = await fetch(`${UPLINK_POST_URL}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const post_getByMiniLink = async (miniLink: string): Promise<any> => {
    const response = await fetch(`${UPLINK_POST_URL}/${miniLink}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const post_getAllByCommunity = async (communityLink: string): Promise<any> => {
    const response = await fetch(`${UPLINK_POST_URL}/c/${communityLink}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const post_getAllByUser = async (username: string): Promise<any> => {
    const response = await fetch(`${UPLINK_POST_URL}/u/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const post_postOne = async (data: Post): Promise<any> => {
    const response = await fetch(`${UPLINK_POST_URL}/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const post_patchById = async (data: any): Promise<any> => {
    const response = await fetch(`${UPLINK_POST_URL}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const post_deleteById = async (id: string): Promise<any> => {
    const response = await fetch(`${UPLINK_POST_URL}/`, {
        method: "DELETE",
        body: JSON.stringify({ _id: id }),
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};
