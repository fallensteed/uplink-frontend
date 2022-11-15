import { API_URL } from "config/api";

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
    upVotes?: string[];
    downVotes?: string[];
    comments?: string[];
    editHistory?: PostEditHistory[];
    userCreated: string;
    userCreatedNotifications: boolean;
    createdAt?: string;
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

export const post_getAllByCommunity = async (communityId: string): Promise<any> => {
    const response = await fetch(`${UPLINK_POST_URL}/c/${communityId}`, {
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

export const post_patchById = async (data: Post): Promise<any> => {
    const response = await fetch(`${UPLINK_POST_URL}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
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
};
