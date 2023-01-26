/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "config/api";

export interface UplinkUser {
    _id: string;
    userId: string;
    verificationStatus: "not-requested" | "requested" | "denied" | "verified";
    displayName?: string;
    default: "username" | "verified";
}

export const UPLINK_USER_URL = `${API_URL}/uplink/user`;

export const uplink_user_getMember = async (username: string): Promise<any> => {
    const response = await fetch(`${UPLINK_USER_URL}/${username}/member`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const uplink_user_getModerator = async (username: string): Promise<any> => {
    const response = await fetch(`${UPLINK_USER_URL}/${username}/moderator`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const uplink_user_getByUserId = async (userId: string): Promise<any> => {
    const response = await fetch(`${UPLINK_USER_URL}/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const uplink_user_self = async (userId: string): Promise<any> => {
    const response = await fetch(`${UPLINK_USER_URL}/self`, {
        method: "POST",
        body: JSON.stringify({ userId: userId }),
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const uplink_user_self_2 = async (): Promise<any> => {
    const response = await fetch(`${UPLINK_USER_URL}/self2`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const uplink_user_postOne = async (data: UplinkUser): Promise<any> => {
    const response = await fetch(`${UPLINK_USER_URL}/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const uplink_user_patch = async (data: UplinkUser): Promise<any> => {
    const response = await fetch(`${UPLINK_USER_URL}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const uplink_user_getFollowers = async (userId: string): Promise<any> => {
    const response = await fetch(`${UPLINK_USER_URL}/${userId}/followers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const uplink_user_getFollowing = async (userId: string): Promise<any> => {
    const response = await fetch(`${UPLINK_USER_URL}/${userId}/following`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};
