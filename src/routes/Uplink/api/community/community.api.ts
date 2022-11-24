/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../../../../common/api/user/user.api";
import { API_URL } from "../../../../config/api";
import { PostPopulated } from "../post/post.api";

export interface Community {
    _id: string;
    name: string;
    about?: string;
    link: string;
    public: boolean;
    members?: string[];
    moderators: string[];
    rules?: CommunityRule[];
    pinnedPosts?: string[];
    createdAt?: Date;
}

export interface CommunityPopulated {
    _id: string;
    name: string;
    about?: string;
    link: string;
    public: boolean;
    members?: User[];
    moderators: User[];
    rules?: CommunityRule[];
    pinnedPosts?: PostPopulated[];
    createdAt?: Date;
}

export interface CommunityRule {
    name: string;
    detail: string;
    order: number;
    [key: string]: any;
}

export const UPLINK_COMMUNITY_URL = `${API_URL}/uplink/community`;

export const community_getAll = async (): Promise<any> => {
    const response = await fetch(`${UPLINK_COMMUNITY_URL}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const community_getAllByUserId = async (id: string): Promise<any> => {
    const response = await fetch(`${UPLINK_COMMUNITY_URL}/u/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const community_getByIdOrLink = async (text: string): Promise<any> => {
    const response = await fetch(`${UPLINK_COMMUNITY_URL}/${text}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const community_postOne = async (data: Community): Promise<any> => {
    const response = await fetch(`${UPLINK_COMMUNITY_URL}/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const community_patchById = async (data: Community): Promise<any> => {
    const response = await fetch(`${UPLINK_COMMUNITY_URL}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const community_deleteById = async (id: string): Promise<any> => {
    const response = await fetch(`${UPLINK_COMMUNITY_URL}/`, {
        method: "DELETE",
        body: JSON.stringify({ _id: id }),
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};
