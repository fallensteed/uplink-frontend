/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "config/api";

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
